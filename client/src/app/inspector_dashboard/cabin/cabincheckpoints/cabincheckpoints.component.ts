import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';
import { fromEvent, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StyledAlertDialogComponent } from 'src/app/styled-alert-dialog/styled-alert-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
interface PitDataItem {
  Description:string
  Dropdown: string;
  Photo: string;
  Reference: string;
  Negative_MNT: string;
  Negative_ADJ: string;
  Positive_ADJ: number;
  Positive_MNT: number;
  Emergency_Features: boolean;
  Customer_Scope: boolean;
  functional_point:string;
  Risklevel:string;
  id:string;
  marks:string;


}
@Component({
  selector: 'app-cabincheckpoints',
  templateUrl: './cabincheckpoints.component.html',
  styleUrls: ['./cabincheckpoints.component.scss']
})
export class CabincheckpointsComponent {


  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;


  title: string = "Card Title";
  recordValues:any[]=[]
  filteredRecords:any[]=[];
  showPopup=false;
  
  id!: string;
  id_no:string='';
  dropdownArray: string[] = [];
  photoArray: string[] = [];
  reference:string[]=[];
  check:boolean=true;
  marks:string='';


  positive_MNT:number=0;
  positive_ADJ:number=0;
  Negative_MNT:string[]=[];
  Negative_ADJ:string[]=[];
  functional_point:string[]=[];
  risk_level:string[]=[];

  Emergency_Features:boolean=false;
  Customerscope:boolean=false;

  documentId:string='';
  unitNo:string='';
  inspectorName:string='';
  section:string='';
  Camera_popup:boolean=false;
 disable:boolean=true;
 isLoading:boolean =false;

 
 


 
 videoStream!: MediaStream;
  isCameraActive = false;
  isImageCaptured = false;
  camera_index!:number;
  showImageView: boolean = false; // Controls whether to display the image view container
selectedImageUrl: string = ''; // Holds the URL of the selected image
hideAllDoneButton: boolean = false;

defect_button_flag:boolean=true;
satisfied_button_flag:boolean=true;
save_button_enable_flag:boolean=false
  // capturedImages!: Blob[];
  capturedImages: Blob[] = [];

  // inputValues: number[] = new Array(this.dropdownArray.length).fill(0);
  inputValues: any[] = [];

  checkpoint!: boolean[];
  NeedforReport!: boolean[];
  photoSelected!: boolean[]; // for image file name highlight in green


  private beforeUnloadSubscription!: Subscription;

  constructor(private cdr:ChangeDetectorRef,private router:Router,private route: ActivatedRoute,private apicallservice:ApicallService,public dialog: MatDialog,private http:HttpClient) { } 


  ngOnInit(): void {

    const encodedId = this.route.snapshot.paramMap.get('id');

    this.section=this.route.snapshot.paramMap.get('section')??'section Not Get';
   
    this.documentId = this.route.snapshot.paramMap.get('documentid') ?? ''; // Use type assertion and provide a default value
    this.unitNo = this.route.snapshot.paramMap.get('unitno') ?? ''; // Use type assertion and provide a default value
    this.inspectorName = this.route.snapshot.paramMap.get('inspectorname') ?? ''; // Use type assertion and provide a default value
    // Do whatever you need with the id parameter
    if (encodedId) {
      this.id = decodeURIComponent(encodedId);
      // Do whatever you need with the id parameter
      this.title=this.id;
      console.log('ID:', this.id);

//  add 
// interface PitDataItem {
//   Description:string
//   Dropdown: string;
//   Photo: string;
//   Reference: string;
//   Negative_MNT: string;
//   Negative_ADJ: string;
//   Positive_ADJ: number;
//   Positive_MNT: number;
//   Emergency_Features: boolean;
//   Customer_Scope: boolean;
// }


      const openRequest: IDBOpenDBRequest = indexedDB.open("offlinedominus", 1);
      openRequest.onerror = (event) => {
        console.error("Failed to open database:", (event.target as IDBOpenDBRequest).error);
      };
    
      openRequest.onsuccess = async (event) => {
        console.log("Database opened successfully.");
    
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
        const transaction: IDBTransaction = db.transaction("inspectionMaster", "readwrite");
        const dominos_data: IDBObjectStore = transaction.objectStore("inspectionMaster");
        const getRequest: IDBRequest<IDBCursorWithValue | null> = dominos_data.openCursor();

               getRequest.onsuccess = (event) => {
                   const cursor: IDBCursorWithValue | null = (event.target as IDBRequest<IDBCursorWithValue>).result;

                   if (cursor) {
                       const record = cursor.value;
                       
                      //  Replace the pitData
                        const pitData = record.cabin;
                      // const pitData = record.car_top;
                      // const pitData = record.machine_room;
                      // const pitData = record.car_top;
                       //const pitData = record.pit;
                      
                       pitData.forEach((item: PitDataItem) => {

                        if(item.Description===this.id){

                        this.dropdownArray=(item.Dropdown.split('~'));
                        this.photoArray=item.Photo.split('~');
                        this.reference=item.Reference.split('~');
                        this.Negative_MNT=item.Negative_MNT.split('~');
                        this.Negative_ADJ=item.Negative_ADJ.split('~');
                        this.positive_ADJ=(item.Positive_ADJ)
                        this.positive_MNT=item.Positive_MNT;
                        this.marks=item.marks;
                        this.Emergency_Features=item.Emergency_Features
                        this.Customerscope=item.Customer_Scope;
                        this.functional_point = item.functional_point.split('~');
                        this.risk_level = item.Risklevel.split('~');
                        this.id_no = item.id;
                        this.dropdownArray.forEach((item, index) => {
                          // Count the number of dynamic inputs (odd indexed parts in split result)
                          const groups = item.split('---').filter((_, i) => i % 2 !== 0);
                          this.inputValues[index] = Array(groups.length).fill(null); // Initialize with `null`
                      });

                        }


                    });
                    this.photoSelected = new Array(this.dropdownArray.length).fill(false);
                    this.checkpoint= new Array(this.dropdownArray.length).fill(false);
                    this.NeedforReport = new Array(this.dropdownArray.length).fill(false);
                    this.capturedImages=new Array(this.dropdownArray.length).fill(null);


    


        
                       
                       cursor.continue();
                   } else {
                       console.log("No more records");
                   }
               };

               getRequest.onerror = (event) => {
                   console.error("Error fetching data from IndexedDB:", getRequest.error);
               };
    
       
      };
    
      openRequest.onupgradeneeded = (event) => {
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
        // console.log("Creating object store...");
        db.createObjectStore("inspectionMaster", { keyPath: "key", autoIncrement: true });
      };

    } else {
      console.error('ID parameter is missing.');
    }

 
  }
    ngOnDestroy() {
    if (this.beforeUnloadSubscription) {
      this.beforeUnloadSubscription.unsubscribe();
    }


  }

  filterCheckedRecords() {
    this.isLoading=true;
    const apiUrl = `${environment.serverUrl}api/record-values`; // Adjust the API endpoint URL accordingly
    const params = {
      section: this.section,
      document_id: this.documentId,
      unit_no: this.unitNo,
      inspector_name: this.inspectorName,
      description:this.id
    };
    console.log('params',params);
    

    this.http.get<any[]>(apiUrl, { params }).subscribe(
      (data) => {
        this.recordValues = data;
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually if needed
        });
        console.log('Fetched record values:', this.recordValues);
        this.filteredRecords = this.recordValues.filter(record => record.checked === 1);
    console.log('Filtered Records:', this.filteredRecords);

    // Log the image URLs to see what is being passed
    this.filteredRecords.forEach(record => {
      console.log('Image URL:', record.img);
    });

    // Show the popup regardless of whether records are found
    this.showPopup = true;
        // this.dropdownArray = data.map(item => item.dropdown_option);  // Populate dropdown options
        // this.photoArray = data.map(item => item.img);                 // Populate photo links (if any)
        // this.checkpoint = data.map(item => item.checked);              // Populate checkbox checked state
        // this.NeedforReport = data.map(item => item.needforReport);     // Populate 'Need for Report' checkboxes
        // this.inputValues = new Array(this.dropdownArray.length).fill('')      
          },
      (error) => {
        console.error('Error fetching record values:', error);
      }
    );
    // Filter records where `checked` is 1
    
  }

  // Method to close popup
  closePopup() {
    this.showPopup = false;
  }


 
 
  
  
 
  

  // handleFileInput(event: any, index: number): void {
  //   const file = event.target.files[0]; // Get the selected file
  //   if (file) {
  //     console.log('Selected file:', file);
  
  //     // Store the Blob object directly in the capturedImages array
  //     this.capturedImages[index] = file;
  //     this.photoSelected[index] = true;
  //     console.log("Captured Blob:", this.capturedImages[index]);
  //   } else {
  //     console.error('No file selected');
  //   }
  // }

  handleFileInput(event: any, index: number): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log('Selected file:', file);
  
      // Store the Blob object directly in the capturedImages array
      this.capturedImages[index] = file;
      this.photoSelected[index] = true;
      console.log("Captured Blob:", this.capturedImages[index]);

      // Automatically check the related checkboxes
      this.checkpoint[index] = true;
      this.NeedforReport[index] = true;
    } else {
      console.error('No file selected');

      // Reset the state if no file is selected
      this.photoSelected[index] = false;
      this.checkpoint[index] = false;
      this.NeedforReport[index] = false;
    }
}
  
  

  
  
  
  


// take picture 
takePicture(index:number):void{
  this.camera_index=index;
  this.isCameraActive=!this.isCameraActive;
  this.openCamera();
}

front_cam= {video: {facingMode: { ideal: 'user' } }};
   usb_cam={video: {facingMode:  { ideal: 'desiredUSBDeviceId' } }};
   back_cam={video: {facingMode:  { ideal: 'environment' } }}
   camera_flipcheck_front:boolean=true
   camera_flipcheck_back:boolean=false
   camera_flipcheck_usb:boolean=false
   constraints:any
camera_flip(): void {
  this.cancelCapture()
  this.camera_flipcheck_usb=false
  this.camera_flipcheck_front=!this.camera_flipcheck_front;
  this.camera_flipcheck_back=!this.camera_flipcheck_back
  this.isCameraActive = true;
  this.openCamera();
}

camera_flip_Usb():void{
  this.cancelCapture()

this.camera_flipcheck_front=false
this.camera_flipcheck_back=true
  this.camera_flipcheck_usb=true
  this.isCameraActive = true;

}

openCamera(): void {
  if( this.camera_flipcheck_back)
    {
      // this.constraints=this.front_cam
      this.constraints=this.back_cam;

    }
    else if(this.camera_flipcheck_front){
      this.constraints=this.front_cam
      // this.constraints=this.back_cam;

    }
    else{
      this.constraints=this.usb_cam;
    }
 

  navigator.mediaDevices.getUserMedia(this.constraints)
    .then((stream: MediaStream) => {
      this.videoStream = stream;
      this.videoElement.nativeElement.srcObject = stream;
      this.isCameraActive = true;
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
    });
}


captureImage(): void {
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;
  const context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Hide the video element
  video.style.display = 'none';

  // Hide the canvas element
  canvas.style.display = 'none';

  // Show the captured image in the <img> element
  this.imageElement.nativeElement.src = canvas.toDataURL('image/jpeg');
  this.imageElement.nativeElement.style.display = 'block';
  this.isImageCaptured = true;
}

retakePicture(): void {
  const video = this.videoElement.nativeElement;
  const canvas = this.canvasElement.nativeElement;

  // Show the video element
  video.style.display = 'block';

  // Hide the canvas element
  canvas.style.display = 'none';

  // Clear the captured image
  this.imageElement.nativeElement.src = '';
  this.imageElement.nativeElement.style.display = 'none';
  this.isImageCaptured = false;
}


// +++++++++++++++++++++++++++++++++++++++++=

confirmImage(): void {
  // Ensure capturedImages array is initialized
  if (!this.capturedImages) {
    this.capturedImages = [];
  }

  // Get the image element
  const imageElement: HTMLImageElement = this.imageElement.nativeElement;

  // Fetch the image source as a Blob
  fetch(imageElement.src)
    .then(response => response.blob())
    .then(blob => {
      // Store the Blob data in the capturedImages array
      this.capturedImages[this.camera_index] = blob;
      this.checkpoint[this.camera_index] = true;
      this.NeedforReport[this.camera_index] = true;

      // Hide the video element and captured image element
      this.videoElement.nativeElement.style.display = 'none';
      imageElement.style.display = 'none';

      // Reset image capture state
      this.isImageCaptured = false;

      // Stop the video stream
      this.videoStream.getTracks().forEach(track => track.stop());
      this.isCameraActive = false;

      // Change the color of the camera icon
      const cameraIcon = document.getElementById(`photoUpload${this.camera_index}`);
      if (cameraIcon) {
        cameraIcon.style.color = 'Red';
      }
    })
    .catch(error => {
      console.error('Error fetching image data:', error);
      // Handle error fetching image data
    });
}


cancelCapture(): void {
  // Clear the captured image if present
  this.imageElement.nativeElement.src = '';
  this.isImageCaptured = false;

  // Stop the video stream
  this.videoStream.getTracks().forEach(track => track.stop());
  this.isCameraActive = false;
}


viewImage(index: number): void {
  console.log(this.capturedImages[index])




  // Check if the capturedImages array contains an image at the specified index
  if (this.capturedImages[index]) {
    // Check if the data at the specified index is a Blob
    if (this.capturedImages[index] instanceof Blob) {
      // Convert the data to a Blob object
      const blobImage: Blob = this.capturedImages[index];

      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(blobImage);

      // Set the URL to display the image
      this.selectedImageUrl = imageUrl;

      // Show the image view container
      this.showImageView = true;
    } else {
      // If the data is not a Blob, display an error message
      alert('Invalid image data.');
    }
  } else {
    // If there is no image at the specified index, display a message
    alert('No image available for this index.');
  }
}


closeImageView(): void {
  // Hide the image view container
  this.showImageView = false;

  // Revoke the URL of the Blob image to release memory
  URL.revokeObjectURL(this.selectedImageUrl);

  // Clear the selected image URL
  this.selectedImageUrl = '';
}



save_button_enable_fun(){
 this.disable=!this.disable
 this.hideAllDoneButton = !this.hideAllDoneButton;
  
  this.save_button_enable_flag=!this.save_button_enable_flag;
}


// async save(): Promise<void> {
//   const valueArray: string[] = this.dropdownArray.map((item, index) => {
//     if (item.includes('---')) {
//       const parts = item.split('---');
//       return `${parts[0]} ${this.inputValues[index] || '---'} ${parts[1]}`;
//     }
//     return item;
//   });

//   if (navigator.onLine) {
//     // Online - Submit data to server
//     this.submitDataToServer(valueArray).then(() => {
//       // console.log("Data submitted successfully");
//       if ('indexedDB' in window) {
//         this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
//           // console.log("Data saved successfully");  
//         }).catch((error) => {
//           console.error("Error saving data locally:", error);
//         });
//       }
//     }).catch((error) => {
//       console.error("Error submitting data to server:", error);
//     });
//   } 
//   else {
//     // Offline - Save data locally
//     if ('indexedDB' in window) {
//       this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
//         alert("Data saved to OutBox");
//       }).catch((error) => {
//         console.error("Error saving data locally:", error);
//       });
//     } 
//     else {
//       alert("Your browser does not support offline data saving.");
//     }
//   }
// }

// private async submitDataToServer(valueArray: string[]): Promise<void> {
//   console.log('insert check point',this.checkpoint);
//   console.log('captured image',this.captureImage);
  
  
//   // if (this.risk_level.includes('5')) {
//   //   // Show a popup message if '5' is found in the risk_level array
//   //   // alert('Risk level contains 5!'); // You can replace this with your preferred way of showing a popup message
//   //   // this.showStyledAlert();
//   //   this.openStyledAlertDialog();

//   // }

//   // Replace with your API call logic
//   for (let i = 0; i < this.risk_level.length; i++) {
//     if (this.risk_level[i] === '5' && this.checkpoint[i]) {
//         this.openStyledAlertDialog();
//         break; // Exit the loop once the condition is met
//     }
// }
 
//   try {
//     const result = await this.apicallservice.insert_Record_Values("cabin",
//       this.id_no,
//       this.documentId, 
//       this.inspectorName,
//       this.section,
      
//       this.unitNo, 
//       this.title, 
//       valueArray, 
//       this.positive_MNT,
//       this.positive_ADJ,
//       this.Negative_MNT,
//       this.Negative_ADJ,   
//       this.functional_point,   
//       this.risk_level,
//       this.Emergency_Features,
//       this.Customerscope,
//       this.checkpoint, 
//       this.capturedImages, 
//       this.NeedforReport
//     ).toPromise();
//     alert(result);
//   } catch (error) {
//     alert("Failed to submit data: " + error);
//   }
// }

// private async submitDataToServer(valueArray: string[]): Promise<void> {
//   console.log('insert check point', this.checkpoint);
//   console.log('captured image', this.captureImage);
//   for (let i = 0; i < this.risk_level.length; i++) {
//     if (this.risk_level[i] === '5' && this.checkpoint[i]) {
//         this.openStyledAlertDialog();
//         break; // Exit the loop once the condition is met
//     }
// }

//   // Iterate through the checkpoint array and process each element
//   for (let i = 0; i < this.checkpoint.length; i++) {
//     if (this.checkpoint[i]) { // Check if checkpoint value is true
//       // Check if the corresponding element in capturedImage array exists
//       if (this.captureImage[i]) {
//         try {
//           const result = await this.apicallservice.insert_Record_Values("cabin",
//             this.id_no,
//             this.documentId,
//             this.inspectorName,
//             this.section,

//             this.unitNo,
//             this.title,
//             valueArray,
//             this.positive_MNT,
//             this.positive_ADJ,
//             this.Negative_MNT,
//             this.Negative_ADJ,
//             this.functional_point,
//             this.risk_level,
//             this.Emergency_Features,
//             this.Customerscope,
//             this.checkpoint,
//             this.capturedImages,
//             this.NeedforReport
//           ).toPromise();
//           alert(result);
//         } catch (error) {
//           alert("Failed to submit data: " + error);
//         }
//       } else {
//         // If capturedImage at the corresponding index is empty, show an alert message
//         alert("Captured image is missing for checkpoint " + i);
//       }
//     }
//   }
// }
// private async submitDataToServer(valueArray: string[]): Promise<void> {
//   console.log('insert check point', this.checkpoint);
//   console.log('captured image', this.capturedImages);
//   const formData = new FormData();

//   // Append each captured image to the FormData object
//   this.capturedImages.forEach((image, index) => {
//     // Check if the image is a Blob and is not null
//     if (image instanceof Blob && image !== null) {
//       formData.append('capturedImages', image);
//     } else {
//       // Handle the case where captured image is not a Blob or is null
//       console.error('Invalid image found at index:', index);
//     }
//   });
//     for (let i = 0; i < this.risk_level.length; i++) {
//     if (this.risk_level[i] === '5' && this.checkpoint[i]) {
//         this.openStyledAlertDialog();
//         break; // Exit the loop once the condition is met
//     }
// }

//   // Check if any checkpoint value is true
//   const isCheckpointTrue = this.checkpoint.some(checkpoint => checkpoint);

//   // If at least one checkpoint is true, proceed
//   if (isCheckpointTrue) {
//     // Iterate through the checkpoint array and process each element
//     for (let i = 0; i < this.checkpoint.length; i++) {
//       if (this.checkpoint[i]) { // Check if checkpoint value is true
//         // Check if the corresponding element in capturedImages array exists and is a Blob
//         if (this.capturedImages[i] instanceof Blob) {
//           try {
//             const result = await this.apicallservice.insert_Record_Values(formData,"cabin",
//               this.id_no,
//               this.documentId,
//               this.inspectorName,
//               this.section,
//               this.unitNo,
//               this.title,
//               valueArray,
//               this.positive_MNT,
//               this.positive_ADJ,
//               this.Negative_MNT,
//               this.Negative_ADJ,
//               this.functional_point,
//               this.risk_level,
//               this.Emergency_Features,
//               this.Customerscope,
//               this.checkpoint,
//               this.capturedImages,
//               this.NeedforReport
//             ).toPromise();
//             alert(result);
//           } catch (error) {
//             alert("Failed to submit data: " + error);
//           }
//         } else {
//           // If capturedImages at the corresponding index is not a Blob or is empty, show an alert message
//           alert("Captured image is missing or invalid for checkpoint " + i+1);
//         }
//       }
//     }
//   } else {
//     // If no checkpoint is true, execute the API call without checking capturedImages
//     try {
//       const result = await this.apicallservice.insert_Record_Values(formData,"cabin",
//         this.id_no,
//         this.documentId,
//         this.inspectorName,
//         this.section,
//         this.unitNo,
//         this.title,
//         valueArray,
//         this.positive_MNT,
//         this.positive_ADJ,
//         this.Negative_MNT,
//         this.Negative_ADJ,
//         this.functional_point,
//         this.risk_level,
//         this.Emergency_Features,
//         this.Customerscope,
//         this.checkpoint,
//         this.capturedImages,
//         this.NeedforReport
//       ).toPromise();
//       alert(result);
//     } catch (error) {
//       alert("Failed to submit data: " + error);
//     }
//   }
// }

async save(): Promise<void> {
  for (let i = 0; i < this.checkpoint.length; i++) {
    if (this.checkpoint[i]===true && this.capturedImages[i] === null && this.photoArray[i]==='Y') {
    
     
      
      
      
      // alert(`Image is missing for checkpoint ${i + 1}`);

      this.check=false;
      break;
    }
  
  }
  this.isLoading=true;
  const condition = this.check;
  console.log('condition',condition);
  const valueArray: string[] = this.dropdownArray.map((item, index) => {
    if (item.includes('---')) {
        const parts = item.split('---');
        return parts
            .map((part, i) => (i < parts.length - 1 ? `${part}${this.inputValues[index][i] || '---'}` : part))
            .join('');
    }
    return item;
});

  let isReallyOnline=false

    this.http.get(this.apicallservice.apiURL+"check_connectivity").subscribe((status:any)=>{
      if (status==true) {
 

    
        this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
          this.submitDataToServer(valueArray).then(() => {
   
          }).catch((error) => {
           
            console.error("Error submitting data to server:", error);
          });
        }).catch((error) => {
          console.error("Error saving data locally:", error);
          this.submitDataToServer(valueArray).then(() => {
   
          }).catch((error) => {
           
            console.error("Error submitting data to server:", error);
          });
        });
    
    
    
      }
      else{
        // Offline - Save data locally
        console.log("Off")
        if ('indexedDB' in window) {
          if(condition==false){
            alert("Mandatory image is missing, Please select the image.");
          }
          else{
          this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
            alert("Data saved to OutBox");
         
          }).catch((error) => {
            console.error("Error saving data locally:", error);
          });
        }
        } 
        else {
          alert("Your browser does not support offline data saving.");
        }
      }

    },(err:any)=>{

      if(err) {
        // Offline - Save data locally
        console.log("Off")
        if ('indexedDB' in window) {
          if(condition==false){
            alert("mandatory image is missing, Please select the image.")

          }
          else{
          this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
            // alert("Data saved to OutBox");
            this.showAlert("Data saved to OutBox").then(() => {
              this.router.navigate(['afterlogin', 'cabin', this.section]);
            });
          }).catch((error) => {
            console.error("Error saving data locally:", error);
          });
        }
        } 
        else {
          alert("Your browser does not support offline data saving.");
        }
      }
    



    });



    






}
showAlert(message: string): Promise<void> {
  return new Promise((resolve) => {
    alert(message);
    resolve();
  });
}


private async submitDataToServer(valueArray: string[]): Promise<void> {

  // if (this.risk_level.includes('5')) {
//   // Show a popup message if '5' is found in the risk_level array
//   // alert('Risk level contains 5!'); // You can replace this with your preferred way of showing a popup message
//   this.openStyledAlertDialog();
// }
// Replace with your API call logic

// for (let i = 0; i < this.checkpoint.length; i++) {
//   if (this.checkpoint[i] && this.capturedImages[i] === null) {
//     // alert(`Image is missing for checkpoint ${i + 1}`);

//     this.check=false;
//     break;
//   }

// }
const condition = this.check;
console.log('condition',condition);
for (let i = 0; i < this.risk_level.length; i++) {
  if (this.risk_level[i] === '5' && this.checkpoint[i]) {
      this.openStyledAlertDialog();
      break; // Exit the loop once the condition is met
  }
}



if(condition==false){
  alert('Mandatory image is missing, Please select the image.')

}
else{
try {
const promises = [];
for (let i = 0; i < this.capturedImages.length; i++) {
  
  const formData = new FormData();
  formData.append("documentId",this.documentId) 
  formData.append("inspectorName",this.inspectorName)
  formData.append("section",this.section)
  
  formData.append("unitNo",this.unitNo) 
  formData.append("title",this.title) 
  formData.append("valueArray",valueArray[i])
  console.log('value array is',valueArray[i]);
  
  
  formData.append("positive_MNT",String(this.positive_MNT))
  formData.append("positive_ADJ",String(this.positive_ADJ))
  formData.append("Negative_MNT",String(this.Negative_MNT[i]))
  formData.append("Negative_ADJ",String(this.Negative_ADJ[i]))    
  formData.append("mark",String(this.marks))
  
  formData.append("Emergency_Features",String(this.Emergency_Features))
  formData.append("Customerscope",String(this.Customerscope))
 
  formData.append("checkpoint",String(this.checkpoint[i]))
  formData.append("image",this.capturedImages[i])
  formData.append("NeedforReport",String(this.NeedforReport[i]))
  formData.append("id_no",this.id_no);
  formData.append("functional_point",String(this.functional_point[i]));
  formData.append("risk_level",String(this.risk_level[i]));









  const promise = new Promise((resolve, reject) => {
    this.http.post<any>(this.apicallservice.apiURL+"insert_Record_Values",formData).
        
    subscribe(
      res => resolve(res),
      err => reject(err)
    );
  });
  promises.push(promise);
}

  // Wait for all promises to resolve
  Promise.all(promises)
  .then(results => {
    const allSuccessful = results.every(result => result === "Data Saved Successfully");
    if (allSuccessful) {
      console.log('All files uploaded successfully:', results);
      alert("All files uploaded successfully");
      this.router.navigate(['afterlogin', 'cabin',this.section]);

    } else {
      console.error('Error uploading files:', results);
      const allExist = results.every(result => {
        if (typeof result === 'string') {
          return result.includes("Data Already Exists in DataBase");
        } else {
          return false; // or handle other types if necessary
        }
      });
      
      if (allExist) {
        alert("Already Exists in Database");
      } else {
        alert("Some files failed to upload");
      }
     
    }
  })
  .catch(error => {
    console.error('Error uploading files:', error);
    alert("Error uploading files");
  });






} catch (error) {
  alert("Failed to submit data: " + error);
}
}
}






openStyledAlertDialog(): void {
  this.dialog.open(StyledAlertDialogComponent, {
    width: '400px', // Adjust the width as needed
    disableClose: true // Prevent closing the dialog by clicking outside or pressing Escape key
  });
}

private showStyledAlert(): void {
  const dangerMessage = `
    <div style="color: red; font-weight: bold;">
      <span style="font-size: 24px;">⚠️</span>
      <span style="font-size: 18px;">Attention: Shutdown Notice Imminent!</span><br>
      <span style="font-size: 16px;">Identifying Critical Lift Points</span><br>
      <span style="font-size: 16px;">Proceed Inspection and Generate Shutdown Notice at the end</span>
    </div>
  `;
  alert(dangerMessage);
}

// private async saveDataLocally(valueArray: string[],Negative_ADJ:string[],Negative_MNT:string[]): Promise<void> {
//   const db = await this.openIndexedDB();
//   const transaction = db.transaction("Offline", "readwrite");
//   const store = transaction.objectStore("Offline");

//   const valueObj = {
//     key: `${this.documentId}+${this.title}`,
//     documentId: this.documentId,
//     inspectorName: this.inspectorName,
//     section:this.section,
//     unitNo: this.unitNo,
//     title: this.title,
//     valueArray,
//     checkpoint: this.checkpoint,
//     capturedImages: this.capturedImages,
//     needForReport: this.NeedforReport,
//     positive_MNT: this.positive_MNT,
//    positive_ADJ:this.positive_ADJ,
//    Negative_MNT,
//   Negative_ADJ,
//   emergency_Features:this.Emergency_Features,
//   customerscope:this.Customerscope,
//   id_no:this.id_no,
//   functional_point:this.functional_point, 
//   risk_level:this.risk_level, 
//   updatedAt: new Date()
//   };

//   try {
//     await store.add(valueObj);
//     // alert("Data Also copied to OutBox");
//   } 
//   catch (error) {
//     if (error instanceof DOMException && error.name === "ConstraintError") {
//       // alert("This data already exists!");
//     } else {
//       console.error("Error saving data locally:", error);
//     }
//   }
// }

// private async openIndexedDB(): Promise<IDBDatabase> {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open("OutBox", 1);
//     request.onupgradeneeded = event => {
//       const db = request.result;
//       db.createObjectStore("Offline", { keyPath: "key" });
//     };
//     request.onerror = () => reject(request.error);
//     request.onsuccess = () => resolve(request.result);
//   });
// }
private async saveDataLocally(valueArray: string[],Negative_ADJ:string[],Negative_MNT:string[]): Promise<void> {
 
  const db = await this.openIndexedDB();
  const transaction = db.transaction(this.inspectorName, "readwrite");
  const store = transaction.objectStore(this.inspectorName);

  

  const valueObj = {
    key: `${this.documentId}+${this.unitNo}+${this.title}`,
    // id_no:this.id_no,

    documentId: this.documentId,
    inspectorName: this.inspectorName,
    section:this.section,
    unitNo: this.unitNo,
    title: this.title,
    valueArray,
    checkpoint: this.checkpoint,
    capturedImages: this.capturedImages,
    needForReport: this.NeedforReport,


    id_no:this.id_no,
    positive_MNT: this.positive_MNT,
    positive_ADJ:this.positive_ADJ,
    Negative_MNT,
    Negative_ADJ,
    functional_point:this.functional_point, 
    risk_level:this.risk_level, 
  emergency_Features:this.Emergency_Features,
  customerscope:this.Customerscope,
  marks:this.marks,

    updatedAt: new Date()
  };

 
  try {
    const existingRecord = await store.get(valueObj.key);
    if (existingRecord) {
      // Record exists, so update it
      await store.put(valueObj);
      console.log("Data updated locally:", valueObj);
    } else {
      // Record doesn't exist, so add a new one
      await store.add(valueObj);
      console.log("Data saved locally:", valueObj);
    }
    console.log('check point', this.checkpoint);
    console.log('need for report', this.NeedforReport);
  } catch (error) {
    if (error instanceof DOMException && error.name === "ConstraintError") {
      console.error("This data already exists!", error);
    } else {
      console.error("Error saving or updating data locally:", error);
    }
  }
}

private async openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OutBox", 1);
    request.onupgradeneeded = event => {
      const db = request.result;
      db.createObjectStore(this.inspectorName, { keyPath: "key" });
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  
  
  
  
  });
}




}