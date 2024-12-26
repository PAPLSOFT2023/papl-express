import { Component,ViewChild, ElementRef,ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { environment } from 'src/environments/environment';
import { SignaturePad } from 'angular2-signaturepad';

interface Row {
  name: string;
  designation: string;
  company: string;
  contact_number: string;
  
  signature: string; 
  role: string;
}

@Component({
  selector: 'app-shutdown',
  templateUrl: './shutdown.component.html',
  styleUrls: ['./shutdown.component.scss']
})
export class ShutdownComponent {

  @ViewChild('signaturePad1') signaturePad1!: SignaturePad; 
  @ViewChild('signaturePad2') signaturePad2!: SignaturePad;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  
  pdfId: number = -1; // Initialize with a default value (-1 or null)
  // @ViewChildren('canvas', 'canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;
  // @ViewChildren('canvas1', 'canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;
  isDialogVisible: boolean = false; // Ensure it's declared as public
  isDialogVisible1: boolean = false; // Ensure it's declared as public
  savedSignature: string | null = null; // Property to hold the saved signature URL
  savedSignature1: string | null = null; // Property to hold the saved signature URL
  // private context: CanvasRenderingContext2D | null = null;
  // private isDrawing: boolean = false;
  capturedSignature1: string | null = null; // Variable to store the captured signature
  isSignatureCaptured: boolean = false; // Flag to manage visibility
 
  capturedSignature: string | null = null; // Variable to store the captured signature
  isSignatureCaptured1: boolean = false; // Flag to manage visibility

  currentDate: string = '';
  inspectorName: string = '';
  issuedByName: string = '';
  designation: string = '';

  documentId:string='';
  // signature: string ="";
  // signature1: string ="";
  signature2: string ="";
  signature: string ="";
  signature1: string ="";
 

   // This function retrieves the signature data as a base64 string
   getSignatureData(): string {
    return this.signaturePad1.toDataURL(); // Get the signature as a base64 image
    return this.signaturePad2.toDataURL(); // Get the signature as a base64 image
  }
 
  // @ViewChildren('canvas', 'canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;
  // @ViewChildren('canvas1', 'canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;
  // @ViewChildren('canvas1, canvas2') canvasList!: QueryList<ElementRef<HTMLCanvasElement>>;

  @ViewChild('popupCanvas', { static: false }) popupCanvas!: ElementRef<HTMLCanvasElement>;


  formData: any = {
    building_name: '',
    location: '',
    customer_workorder_name: '',
    contract_number: '',
    inspector_signature: null,
    inspector_list: '',
    total_units_schedule: '',
    no_of_breakdays: '',
    schedule_combined: '',
    inspector_array:'',
    
    total_days:'',
  };

  


  rows: Row[] = [
    { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },
    { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },

    // { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' },
    // { name: '', designation: '',role: '', company: '', contact_number: '' ,signature: ''},
    // { name: '', designation: '',role: '', company: '', contact_number: '',signature: '' }
  ];

  addRow() {
    this.rows.push({ name: '', designation: '', role: '', company: '', contact_number: '',signature: '' });
  }


  

  //second sign
  
 

  riskLevel5DropdownOptions: string = "";
  baseUrl = `${environment.serverUrl}`;
    current_date=new Date();
  name:string='';

  location:string=`${environment.clientUrl}assets/carp.jpg`;
  unit:string='';
  document_id:string='';
  
  contract_no:string='';
  breif_spec:any[]=[];
  records:any[]=[];
  inf_26:{id:number,contract_number:string,customer_workorder_name:string,customer_workorder_date:string,
    customer_name_as_per_work_order:string,type_of_inspection:string,job_type:string,project_name:string,
    building_name:string,location:string,type_of_building:string,site_address:string,customer_contact_name:string,
    ustomer_contact_number:string,customer_contact_number:string,customer_contact_mailid:string,oem_details:string,
    no_of_elevator:number,no_of_escalator:number,no_of_travelator:number,	no_of_mw:number, no_of_car_parking:number,
    travel_expenses_by:string,accomodation_by:string,no_of_stops_elevator:number,no_of_stops_dw:number,no_of_home_elevator:number,
    no_of_visits_as_per_work_order:number,no_of_mandays_as_per_work_order:number,	total_units_schedule:number,schedule_from:string,
    schedule_to:string,tpt6:number,	tpt7:number, load_test:number,pmt:number,rope_condition:number,callback:number,balance:number,inspector_list:string[],
    inspector_array:string}={id:0,contract_number:'',customer_workorder_name:'',customer_workorder_date:'',customer_name_as_per_work_order:'',type_of_inspection:'',job_type:'',project_name:'',building_name:'',location:'',type_of_building:'',site_address:'',customer_contact_name:'',ustomer_contact_number:'',customer_contact_number:'',customer_contact_mailid:'',oem_details:'',no_of_elevator:0,no_of_escalator:0,no_of_travelator:0,	no_of_mw:0,no_of_car_parking:0,travel_expenses_by:'',accomodation_by:'',no_of_stops_elevator:0,no_of_stops_dw:0,no_of_home_elevator:0,no_of_visits_as_per_work_order:0,no_of_mandays_as_per_work_order:0,	total_units_schedule:0,schedule_from:'',
    schedule_to:'',tpt6:0,	tpt7:0, load_test:0,pmt:0, rope_condition:0,callback:0,balance:0,inspector_list:[],inspector_array:''};



  
  generatePDF() {
    const element = document.body; 
    // html2pdf(element);
  }

  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
    this.route.paramMap.subscribe(params => {
      this.unit=this.route.snapshot.paramMap.get('unit')??'section Not Get';
      this.document_id = this.route.snapshot.paramMap.get('document_id') ?? '';
      this.contract_no = this.route.snapshot.paramMap.get('c_no') ?? '';
      console.log('unit is',this.unit);
      console.log('document id',this.document_id);
      console.log('contract no is',this.contract_no);
      
      
      

     
     
   });

 }

 ngOnInit(): void{
  this.inspectorName = sessionStorage.getItem('UserName') as string;
  this.fetchSignature();
  this.name = sessionStorage.getItem('UserName') as string;


  this.dataService.getDetailsForContractName(this.contract_no).subscribe((details: any) => {
    console.log('inf api is called');
    
     this.inf_26 = details;
 
    console.log('shutdown inf',this.inf_26);
    console.log('inspector array is',details.inspector_array);
    const Ins_array = JSON.parse(details.inspector_array);
    
  });

  
  this.http.get<any[]>(`${this.baseUrl}records`, {
    params: {
      document_id: this.document_id,
      unit_no: this.unit,
      // section: section
    }
  })
  .subscribe(data => {
    this.records = data;
    console.log('records',this.records);
    // this.checkFunctionalPointYChecked1();  
    // this.riskLevel5DropdownOptions = this.records
    // .filter(record => record.risk_level === "5")
    // .map(record => record.dropdown_option);
    // this.riskLevel5DropdownOptions = this.riskLevel5DropdownOptions.map(option =>
    //   option.replace(/[\[\]\r\n"]/g, '') // Remove "\r", "\n", and double quotes
    // );
    this.riskLevel5DropdownOptions = this.records
  .filter(record => record.risk_level === "5" && record.checked==true)
  .map(record => record.dropdown_option)
  .map(option => option.replace(/[\[\]\r\n"]/g, '')) // Remove "\r", "\n", double quotes, and square brackets
  .join(', '); // Join the elements with a comma and space


  console.log('Dropdown options with risk level 5:', this.riskLevel5DropdownOptions); 
  });
  const inspector = `${environment.serverUrl}api/b_spec?encodedValue=${this.document_id}&encodedValue1=${this.unit}`;  
  console.log('url is',inspector);
  
  this.http.get<any[]>(inspector) // Replace with your server endpoint
    .subscribe(data => {
      this.breif_spec = data;
      console.log('breif spec is',this.breif_spec);
      
    });
 }

 fetchSignature() {
  const name = sessionStorage.getItem('UserName') as string;
  // console.log('inspector name',this.name);
  this.http.get(`${environment.serverUrl}signature/` + name, { responseType: 'blob' })    .subscribe((data: Blob) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.signature = event.target.result;
      };
      reader.readAsDataURL(data);
    }, error => {
      console.error('Error fetching signature:', error);
    });
}


// ngAfterViewInit(): void {
//   // Ensure popupCanvas is now initialized and accessible
//   if (this.popupCanvas && this.popupCanvas.nativeElement) {
//     console.log('Canvas initialized:', this.popupCanvas.nativeElement);
//   } else {
//     console.error('Canvas element not found.');
//   }
// }


handleButtonClick(): void {
  this.isDialogVisible = true;
}
handleButtonClick1(): void {
  this.isDialogVisible1 = true;
}

closeDialog(): void {
  this.isDialogVisible = false;
}
closeDialog1(): void {
  this.isDialogVisible1 = false;
}




generateAndDownloadPDF() {
  let content1 = this.contentToConvert.nativeElement.innerHTML;

  // Clean the content before generating the PDF
  content1 = content1.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, (match: string, p1: string) => {
    return `<span>${p1}</span>`;
  });
  content1 = content1.replace(/<input[^>]*>/g, '');
  content1 = content1.replace(/placeholder="[^"]*"/g, '');

  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const body = {
    contract_no: this.contract_no,          // Add contract number
    documentId: this. document_id,            // Add document ID
    building_name: this.inf_26.building_name,
    inspector_name:  this.inspectorName ,     // Add inspector nam
    content: `
      <html>
        <head>
          <style>
          


 body {
              font-family: 'Calibri';
             
            }

.signature-image {
    width: 100px; /* Adjust the width as needed */
    height: auto; /* Maintain aspect ratio */
  
  }

  .signature-icon {
    font-size: 24px;
    cursor: pointer;
  }
  
 
/* Overlay styles */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative;
  }
  
  .close_button {
    background: #ff5c5c;
    border: none;
    color: white;
    font-size: 16px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .close_button i {
    pointer-events: none; /* ensures the icon doesn't interfere with the button click */
  }
  
  
  h2 {
    margin-top: 0;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  canvas {
    border: 1px solid #ccc;
    display: block;
    margin-bottom: 20px;
  }
  
  .button-container {
    text-align: center;
  }
  
  .new_button, .button {
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    border-radius:8px; /* Rounded corners */
  }
  
  .new_button1{
    background-color: #148d3d;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    font-size: 15px;
    border-radius:8px; /* Rounded corners */
  }
  
  .new_button{
    background-color: #000000;
    color: white;
  
    border: none;
  }
  
  
  .button {
    background-color: #f44336;
    color: white;
    border: none;
    font-size: 15px;
  }
  
  .button:hover {
    background-color: #da190b;
  }
  
  
   
  
   
  

.logo{
    height:70px;
    width: 200px;
    margin-top: 30px;
    margin-left:65px;
}
p{
    text-align: center;
}

.table-container {
    width: 80%;
    margin: 0 auto; 
}
table {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #dddddd;
    text-align: center;
    font-family: 'calibri';
    padding: 8px;
}
th {
    background-color: #f2f2f2;
}
.sign{
    text-align: left;
}

input[type="text"] {
    padding:8px; 
    border:none;
    font-size: 16px;
    width:300px; 
}

 td[contenteditable="true"] {
    padding: 10px;
    min-width: 100px;
    max-width: 100px;
     
}

input[type="date"] {
    font-size:18px; 
    
}


@media only screen and (max-width: 768px) {
    .table-container {
        width: 100%;
    }

    input[type="text"] {
        width: 100%;
    }

    td[contenteditable="true"] {
        min-width: auto;
        max-width: auto;
    }
}

.footer {
  position: fixed;          /* Fix the footer at the bottom */
  bottom: 0;                /* Aligns it to the bottom of the page */
  right: 0;                 /* Aligns it to the right end */
  text-align: right;        /* Ensures text is aligned to the right */
  width: 100%;              /* Ensures footer spans the width of the page */
  padding-right: 10px;      /* Optional padding to avoid touching the edge */
  font-size: 12px;          /* Adjust font size as per your needs */
}
@media print {
    .button-container {
      display: none;
    }
  }
.borderless-date-input {
    border: none; /* Remove border */
    outline: none; /* Remove outline */
    /* Optionally, you can add more styles to customize the appearance */
  }
 @font-face {
  font-family: 'Calibri';
  src: url('/assets/fonts/calibri/calibri-regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

*{
font-family:'Calibri';
}


  
          </style>
        </head>
        <body>${content1}</body>
      </html>
    `
  };

  // Make the API call to generate the PDF and store it in the database
  this.http.post<{ id: number }>(`${environment.serverUrl}api/shutdown_pdf`, body, { headers })
    .subscribe(
      response => {
        this.pdfId = response.id; // Store the PDF ID
        console.log('PDF generated successfully:', this.pdfId);
        
        // Automatically download the PDF after generation
        this.downloadPDF(this.pdfId); // Call the function to download the PDF
      },
      error => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again later.');
      }
    );
}

// Method to automatically download the PDF after generation
downloadPDF(pdfId: number) {
  this.http.get(`${environment.serverUrl}api/view_shutdown_pdf/${pdfId}`, { responseType: 'blob' })
    .subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.inf_26.building_name}-${this.unit}-shutdown_notice.pdf`; // Automatically name the file
        link.click(); // Trigger the download
        window.URL.revokeObjectURL(url);
        alert('PDF downloaded successfully!');
      },
      (error) => {
        console.error('Error retrieving PDF:', error);
        alert('Error retrieving PDF. Please try again later.');
      }
    );
}






signaturePadOptions: Object = { 
  'minWidth': 1.0,   // Minimum width for finer lines
  'maxWidth': 1.5, 
      'canvasWidth': 250,
    'canvasHeight': 120,
    'penColor': 'black' 
  };

  // signaturePadOptions: Object = { 
  //   'minWidth': 1.0,    // Minimum width for finer lines
  //   'maxWidth': 2.0,    // Slightly increased max width for bolder lines
  //   'canvasWidth': 350,  // Increased canvas width
  //   'canvasHeight': 180, // Increased canvas height
  //   'penColor': 'black' 
  // };
  


  // drawComplete() {
  //   if (this.signaturePad1) {
  //     this.signature1 = this.signaturePad1.toDataURL();  // Save signature as a base64 image
  //     console.log('Signature 1 captured:', this.signature1);
  //   }
  // }



 

  // drawComplete1() {
  //   if (this.signaturePad2) {
  //     this.signature2 = this.signaturePad2.toDataURL();  // Save signature as a base64 image
  //     console.log('Signature 2 captured:', this.signature2);
  //   }
  // }
  drawComplete() {
    if (this.signaturePad1) { // Check if signaturePad1 is initialized
      if (!this.signaturePad1.isEmpty()) {
        const signature1 = this.signaturePad1.toDataURL(); // Base64 of signature 1
        console.log('Signature 1 captured:', signature1);
        this.signature1 = signature1; // Save signature to variable
      } else {
        console.log('Signature pad 1 is empty.');
      }
    } else {
      console.log('Signature pad 1 is not initialized.');
    }
  }
  
  drawComplete1() {
    if (this.signaturePad2) { // Check if signaturePad2 is initialized
      if (!this.signaturePad2.isEmpty()) {
        const signature2 = this.signaturePad2.toDataURL(); // Base64 of signature 2
        console.log('Signature 2 captured:', signature2);
        this.signature2 = signature2; // Save signature to variable
      } else {
        console.log('Signature pad 2 is empty.');
      }
    } else {
      console.log('Signature pad 2 is not initialized.');
    }
  }
  
  clearSignature1() {
    if (this.signaturePad2) {
      this.signaturePad2.clear(); // Clear the signature pad
      this.capturedSignature1 = null; // Reset the captured signature
      this.isSignatureCaptured = false; // Reset visibility flag
    }
  }

  captureSignature1() {
    if (this.signaturePad2 && !this.signaturePad2.isEmpty()) {
      // Get the original signature as a Base64 image
      const originalSignature = this.signaturePad2.toDataURL(); 
      const img = new Image();
      img.src = originalSignature;
  
      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (ctx) { // Check if ctx is not null
          // Set the desired small size
          const smallWidth = 80;  // Set your desired small width
          const smallHeight = 45;  // Set your desired small height
          canvas.width = smallWidth;
          canvas.height = smallHeight;
  
          // Draw the original image onto the smaller canvas
          ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
          
          // Get the resized image as a Base64 string
          this.capturedSignature1 = canvas.toDataURL(); // Save the base64 signature
          this.isSignatureCaptured = true; // Set the flag to true when the signature is saved
  
          console.log('Captured Signature 2:', this.capturedSignature1); // Log the captured signature
          window.alert('Signature saved successfully!');
        } else {
          console.error('Could not get 2D context from the canvas.');
          window.alert('Failed to save the signature. Please try again.');
        }
      };
    } else {
      console.log('No signature detected in pad 2!'); // Log if no signature detected
      window.alert('Please draw a signature before saving.'); // Alert the user
    }
  }
  



  
  clearSignature() {
    if (this.signaturePad1) {
      this.signaturePad1.clear(); // Clear the signature pad
      this.capturedSignature1 = null; // Reset the captured signature
      this.isSignatureCaptured1 = false; // Reset visibility flag
  }
}

captureSignature() {
  if (this.signaturePad1 && !this.signaturePad1.isEmpty()) {
    // Get the original signature as a Base64 image
    const originalSignature = this.signaturePad1.toDataURL();
    const img = new Image();
    img.src = originalSignature;

    img.onload = () => {
      // Create a canvas to resize the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) { // Check if ctx is not null
        // Set the desired small size
        const smallWidth = 80;  // Width set to 20px
        const smallHeight = 45;  // Height set to 10px
        canvas.width = smallWidth;
        canvas.height = smallHeight;

        // Draw the original image onto the smaller canvas
        ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
        
        // Get the resized image as a Base64 string
        this.capturedSignature = canvas.toDataURL();  // Save the resized base64 signature
        this.isSignatureCaptured1 = true; // Set the flag to true when the signature is saved

        console.log('Captured Signature 1:', this.capturedSignature);
        window.alert('Signature saved successfully!');
      } else {
        console.error('Could not get 2D context from the canvas.');
        window.alert('Failed to save the signature. Please try again.');
      }
    };
  } else {
    console.log('No signature detected in pad 1!'); // Log if no signature detected
    window.alert('Please draw a signature before saving.'); // Alert the user
  }
}
}

