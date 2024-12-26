import { Component, ElementRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';
import { fromEvent, Subscription } from 'rxjs';
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
  id:string,
  marks:number,


}

@Component({
  selector: 'app-pitcheckpoints',
  templateUrl: './pitcheckpoints.component.html',
  styleUrls: ['./pitcheckpoints.component.scss']
})
export class PitcheckpointsComponent  {


  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef;

  recordValues:any[]=[];
  
  filteredRecords: any[] = [];
  title: string = "Card Title";
  capturedImages:any[] = [];
  isLoading  = false;
  id!: string;
  id_no:string='';
  dropdownArray: string[] = [];
  photoArray: string[] = [];
  reference:string[]=[];
  functional_point:string[]=[];
  risk_level:string[]=[];
  showPopup = false;


  positive_MNT:number=0;
  positive_ADJ:number=0;
  marks:number=0;
  Negative_MNT:string[]=[];
  Negative_ADJ:string[]=[];
  Emergency_Features:boolean=false;
  Customerscope:boolean=false;
  check:boolean=true;


  documentId:string='';
  unitNo:string='';
  inspectorName:string='';
  section:string='';
  Camera_popup:boolean=false;
 disable:boolean=true;

 


 
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
  // capturedImages1: File[] = []; 
  // capturedImages: string[] = [];

  // inputValues: number[] = new Array(this.dropdownArray.length).fill(0);
  inputValues: any[] = [];

  checkpoint!: boolean[];
  NeedforReport!: boolean[];
  photoSelected!: boolean[]; // for image file name highlight in green
  encodedId:string|null='';


  private beforeUnloadSubscription!: Subscription;

  constructor(private route: ActivatedRoute,private apicallservice:ApicallService,private http:HttpClient,private router:Router,private cdr:ChangeDetectorRef) { } 


  ngOnInit(): void {

    this.encodedId = this.route.snapshot.paramMap.get('id');

    this.section=this.route.snapshot.paramMap.get('section')??'section Not Get';
   
    this.documentId = this.route.snapshot.paramMap.get('documentid') ?? ''; // Use type assertion and provide a default value
    this.unitNo = this.route.snapshot.paramMap.get('unitno') ?? ''; // Use type assertion and provide a default value
    this.inspectorName = this.route.snapshot.paramMap.get('inspectorname') ?? ''; // Use type assertion and provide a default value
    // Do whatever you need with the id parameter
    if (this.encodedId) {
      this.id = decodeURIComponent(this.encodedId);
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
                      //  const pitData = record.cabin;
                      // const pitData = record.car_top;
                      // const pitData = record.machine_room;
                      // const pitData = record.car_top;
                       const pitData = record.pit;
                      
                       pitData.forEach((item: PitDataItem) => {

                        if(item.Description===this.id){

                        this.dropdownArray=(item.Dropdown.split('~'));
                        console.log('dropdown array',this.dropdownArray);
                        
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

  private imagecondition(){
    
    
    for (let i = 0; i < this.checkpoint.length; i++) {
      if (this.checkpoint[i] && this.capturedImages[i] === null) {
        // alert(`Image is missing for checkpoint ${i + 1}`);
        this.check=false;
        break;
      }
    
    }
    return this.check;
  }
  
  private blobFromFile(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(new Blob([reader.result as ArrayBuffer]));
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  


  
  
  
  

  
  
  
  


// take picture 
takePicture(index:number):void{
  this.camera_index=index;
  this.isCameraActive=!this.isCameraActive;
  this.openCamera();
}

onObservationSelectChange(index: number): void {
  // When "Select the Observation" checkbox is checked, automatically check "Image Required for Report" if photo is required
  if (this.checkpoint[index]) {
    if (this.photoArray[index]?.toLowerCase() === 'y') {
      this.NeedforReport[index] = true;
    }
  } else {
    this.NeedforReport[index] = false;
  }
}

onNeedForReportChange(index: number): void {
  // When "Image Required for Report" checkbox is checked, automatically check "Select the Observation" if photo is required
  if (this.NeedforReport[index] && this.photoArray[index]?.toLowerCase() === 'y') {
    this.checkpoint[index] = true;
  } else {
    this.checkpoint[index] = false;
  }
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
      console.log('captured pic blob is',this.captureImage);
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

front_cam= {video: {facingMode: { ideal: 'user' } }};
   usb_cam={video: {facingMode:  { ideal: 'desiredUSBDeviceId' } }};
   back_cam={video: {facingMode:  { ideal: 'environment' } }}
   camera_flipcheck_front:boolean=true //need to change
   camera_flipcheck_back:boolean=false //need to change
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




async save(): Promise<void> {
  console.log('photo array ',this.photoArray);
  console.log('captured images',this.capturedImages);
  console.log('checkpoint',this.checkpoint);
  console.log('first condition',this.checkpoint[0] && this.capturedImages[0] === null && this.photoArray[0]==='Y');
  console.log('second condition',this.checkpoint[1] && this.capturedImages[1] === null && this.photoArray[1]==='Y');
  console.log('third condition',this.checkpoint[2] && this.capturedImages[2] === null && this.photoArray[2]==='Y');
  console.log('fourth condition',this.checkpoint[3] && this.capturedImages[3] === null && this.photoArray[3]==='Y');

  
  
  

  
  for (let i = 0; i < this.checkpoint.length; i++) {
    if (this.checkpoint[i]===true && this.capturedImages[i] === null && this.photoArray[i]==='Y') {
    
     
      
      
      
      // alert(`Image is missing for checkpoint ${i + 1}`);

      this.check=false;
      break;
    }
  
  }
  console.log('check value',this.check);
  
  const condition = this.check;
  console.log('condition1',condition);

  this.isLoading = true;
  // const valueArray: string[] = this.dropdownArray.map((item, index) => {
  //   if (item.includes('---')) {
  //     const parts = item.split('---');
  //     return `${parts[0]} ${this.inputValues[index] || '---'} ${parts[1]}`;
  //   }
  //   return item;
  // });
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
            alert('Mandatory image is missing, Please select the image.')
            // this.isLoading = false;
            }
            else{
            this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
            // alert("Data saved to OutBox");
            this.showAlert("Data saved to OutBox").then(() => {
              this.router.navigate(['afterlogin', 'pit', this.section]);
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
      // this.isLoading = false;

    },(err:any)=>{

      if(err) {
        // Offline - Save data locally
        console.log("Off")
        if ('indexedDB' in window) {
          if(condition==false){
            alert('Mandatory image is missing, Please select the image.')
            // this.isLoading = false;
            }
            else{
            this.saveDataLocally(valueArray,this.Negative_ADJ,this.Negative_MNT).then(() => {
            // alert("Data saved to OutBox");
            this.showAlert("Data saved to OutBox").then(() => {
              this.router.navigate(['afterlogin', 'pit', this.section]);
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

private async submitDataToServer(valueArray: string[]): Promise<void> {

  console.log('captured images',this.capturedImages);
  console.log('check point',this.checkpoint);
  console.log('photo array',this.photoArray);
  
  // for (let i = 0; i < this.checkpoint.length; i++) {
  //   if (this.checkpoint[i] && this.capturedImages[i] === null) {
  //     // alert(`Image is missing for checkpoint ${i + 1}`);

  //     this.check=false;
  //     break;
  //   }
  
  // }
  const condition = this.check;
  console.log('condition2',condition);
  
  if (condition==false) {
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
    formData.append("mark",String(this.marks))
    // console.log('mark is',this.mark);
    
    formData.append("positive_ADJ",String(this.positive_ADJ))
    formData.append("Negative_MNT",this.Negative_MNT[i])
    formData.append("Negative_ADJ",this.Negative_ADJ[i])      
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
        this.router.navigate(['afterlogin', 'pit',this.section]);
      
    

        
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

showAlert(message: string): Promise<void> {
  return new Promise((resolve) => {
    alert(message);
    resolve();
  });
}



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