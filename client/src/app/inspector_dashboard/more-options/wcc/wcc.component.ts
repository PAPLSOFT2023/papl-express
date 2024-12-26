import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignaturePad } from 'angular2-signaturepad';



interface InspectorInfo {
  units: number;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-wcc',
  templateUrl: './wcc.component.html',
  styleUrls: ['./wcc.component.scss']
})

export class WccComponent {

  isSignatureCaptured: boolean = false; // Control visibility of the signature pad

  @ViewChild('signaturePad') signaturePadElement: ElementRef | undefined;
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;

  @ViewChild('popupCanvas', { static: false }) popupCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  pdfId: number | undefined;
  modalOpen = false;
  currentDate: string = '';
  inspectorName: string = '';
  issuedByName: string = '';
  designation: string = '';
  savedSignature: string | null = null;
  documentId:string='';
  contract_no:string='';
  signature: string="";
  rows: any;

  isEditingName = true; // Start by allowing the user to edit
  isEditingDesignation = true;
  location=environment.clientUrl+"assets/carp.jpg"

 


  
  constructor(private http: HttpClient, private datePipe: DatePipe,private route:ActivatedRoute) {
    this.inspectorName = sessionStorage.getItem('UserName') as string;
   
  }

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

  ngOnInit() {
    console.log('url',this.location);
    
   
    this.documentId = this.route.snapshot.paramMap.get('document_id') ?? ''; // Use type assertion and provide a default value
    this.contract_no = this.route.snapshot.paramMap.get('c_no') ?? '';
    console.log('document id',this.documentId);
    console.log('contract',this.contract_no);
    this.fetchInf26Data(this.contract_no);
    
    
  }


  openModal() {
    this.modalOpen = true;
    setTimeout(() => {
      const canvas = this.popupCanvas.nativeElement;
      if (canvas) {
        canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }

  closeModal() {
    this.modalOpen = false;
  }

 

  fetchInf26Data(contractNumber: string) {
    const apiUrl = `${environment.serverUrl}api/getInf26Data`;
    const name = this.inspectorName;

    const params = { contractNumber, name };
    console.log('contract number is', contractNumber);
    console.log('inspector name is', this.inspectorName);

    this.http.get<any>(apiUrl, { params }).subscribe(
      data => {
        console.log("Data received:", data);

        this.formData.building_name = data.building_name;
        this.formData.location = data.location;
        this.formData.inspector_array = data.inspector_array;

        this.formData.customer_workorder_name = data.customer_workorder_name;
        this.formData.customer_workorder_date = data.customer_workorder_date;
        this.formData.contract_number = data.contract_number;
        this.formData.inspector_signature = 'data:image/jpeg;base64,' + data.signature;

        if (data.inspector_list && data.inspector_list.length > 0) {
          const match = data.inspector_list.match(/"([^"]*)"/);
          this.formData.inspector_list = match ? match[1] : '';
        } else {
          this.formData.inspector_list = '';
        }

        this.formData.total_units_schedule = data.total_units_schedule;
        this.formData.no_of_breakdays = data.no_of_breakdays;

        this.formData.schedule_from = this.datePipe.transform(data.schedule_from, 'yyyy-MM-dd');
        this.formData.schedule_to = this.datePipe.transform(data.schedule_to, 'yyyy-MM-dd');
        this.formData.schedule_combined = `${this.formData.schedule_from} - ${this.formData.schedule_to}`;

        console.log('From and To Dates:', this.formData.schedule_from, this.formData.schedule_to);
        this.calculateDateDifference();
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }

  calculateDateDifference() {
    const fromDateStr = this.getFromDate(this.formData);
    const toDateStr = this.getToDate(this.formData);

    // Convert date strings to Date objects
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);

    // Normalize both dates to the start of the day (midnight)
    const fromDateStart = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    const toDateStart = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());

    // Calculate the difference in milliseconds
    const diffInMs = toDateStart.getTime() - fromDateStart.getTime();

    // Convert milliseconds to days
    const msInDay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.floor(diffInMs / msInDay);

    this.formData.total_days = diffInDays+1;

    console.log('Difference in Days:', diffInDays);
  }




// PDF_wcc() {
//   let content1 = this.contentToConvert.nativeElement.innerHTML;

//   // Replace input elements with their values
//   content1 = content1.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, (match: string, p1: string) => {
//     return `<span>${p1}</span>`;
//   });

//   // Remove the remaining input fields and placeholders
//   // content1 = content1.replace(/<input[^>]*>/g, ''); // Remove any remaining input fields
//   // content1 = content1.replace(/placeholder="[^"]*"/g, ''); // Remove placeholder attributes

//   // Embed the signature image if it exists
//   let signatureHtml = '';
//   if (this.signature) {
//     signatureHtml = `<img src="${this.signature}" class="signature-image" alt="Signature" />`;
//   }

//   const body = {
//     contract_no: this.contract_no,
//     documentId: this.documentId,
//     building_name: this.formData.building_name,
//     inspector_name: this.inspectorName,
//     content: `
//       <html>
//         <head>
//           <title>Work Completion Certificate</title>
//           <style>
//             /* Your CSS styling */
//             .signature-image {
//               width: 150px;
//               height: auto;
//             }
//           </style>
//         </head>
//         <body>
//           ${content1}
//           <div>
//             <b>Signature:</b> ${signatureHtml}
//           </div>
//         </body>
//       </html>
//     `
//   };

//   // Make the HTTP POST request to generate the PDF
//   this.http.post<{ id: number }>(`${environment.serverUrl}create_pdf`, body)
//     .subscribe(
//       (response) => {
//         this.pdfId = response.id;
//         console.log('PDF generation successful, ID:', this.pdfId);
//         this.downloadPDF(this.pdfId); // Trigger PDF download
//       },
//       (error) => {
//         console.error('Error generating PDF:', error);
//         alert('Error generating PDF. Please try again later.');
//       }
//     );
// }

// PDF_wcc() {
//   let content1 = this.contentToConvert.nativeElement.innerHTML;

//   // Replace input elements with their values
//   content1 = content1.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, (match: string, p1: string) => {
//     return `<span>${p1}</span>`;
//   });

//   // Remove signature pad controls and buttons (save, clear)
//   content1 = content1.replace(/<signature-pad[^>]*>[\s\S]*?<\/signature-pad>/g, '');  // Remove signature pad element
//   content1 = content1.replace(/<button[^>]*class="clear-signature-btn"[^>]*>.*?<\/button>/g, '');  // Remove clear button
//   content1 = content1.replace(/<button[^>]*class="capture-signature-btn"[^>]*>.*?<\/button>/g, '');  // Remove save button

//   // Embed the signature image if it exists
//   let signatureHtml = '';
//   if (this.signature) {
//     signatureHtml = `<img src="${this.signature}" class="signature-image" alt="Signature" />`;
//   }

//   const body = {
//     contract_no: this.contract_no,
//     documentId: this.documentId,
//     building_name: this.formData.building_name,
//     inspector_name: this.inspectorName,
//     content: `
//       <html>
//         <head>
//           <title>Work Completion Certificate</title>
//           <style>
//             /* Your CSS styling */
//             .signature-image {
//               width: 150px;
//               height: auto;
//             }
//           </style>
//         </head>
//         <body>
//           ${content1}
//           <div>
//             <b>Signature:</b> ${signatureHtml}
//           </div>
//         </body>
//       </html>
//     `
//   };

//   // Make the HTTP POST request to generate the PDF
//   this.http.post<{ id: number }>(`${environment.serverUrl}create_pdf`, body)
//     .subscribe(
//       (response) => {
//         this.pdfId = response.id;
//         console.log('PDF generation successful, ID:', this.pdfId);
//         this.downloadPDF(this.pdfId); // Trigger PDF download
//       },
//       (error) => {
//         console.error('Error generating PDF:', error);
//         alert('Error generating PDF. Please try again later.');
//       }
//     );
// }


PDF_wcc() {
  let content1 = this.contentToConvert.nativeElement.innerHTML;

  // Replace input elements with their values
  content1 = content1.replace(/<input[^>]*value="([^"]*)"[^>]*>/g, (match: string, p1: string) => {
    return `<span>${p1}</span>`;
  });

  // Remove signature pad controls and buttons (save, clear)
  content1 = content1.replace(/<signature-pad[^>]*>[\s\S]*?<\/signature-pad>/g, '');  // Remove signature pad element
  content1 = content1.replace(/<button[^>]*class="clear-signature-btn"[^>]*>.*?<\/button>/g, '');  // Remove clear button
  content1 = content1.replace(/<button[^>]*class="capture-signature-btn"[^>]*>.*?<\/button>/g, '');  // Remove save button



  content1 = content1.replace(/<button[^>]*>\s*Edit\s*<\/button>/g, ''); // Remove the Edit button
  content1 = content1.replace(/<button[^>]*>\s*Save\s*<\/button>/g, ''); // Remove the Save button


 

  const body = {
    contract_no: this.contract_no,
    documentId: this.documentId,
    building_name: this.formData.building_name,
    inspector_name: this.inspectorName,
    content: `
      <html>
        <head>
          <title>Work Completion Certificate</title>
          <style>
            /* Example of inline CSS for layout and design */
            body {
              font-family: 'Calibri';
              margin: 0;
              padding: 20px;
              background-color: #fff;
            }
              .footer{
  font-family: 'Calibri';
   font-family: 'Calibri';
  font-size: 10px;
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
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 10px;
              font-family: 'calibri';
              border: 1px solid #ddd;
              text-align: left;
            }
              .issue {
              text-align: center;
              font-size: 20px; /* Increase font size */
              font-weight: bold;
               margin-top: 30px; /* Add more margin top */
}
            .title {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
            }
            .logo {
              width: 80px;
              height: auto;
              position: absolute; /* Position absolute for left alignment */
              // top: 20px; /* Adjust as needed */
              left: 30px; /* Adjust for left alignment */

            }
            .signature-image {
              width: 150px;
              height: auto;
            }
            .clear-signature-btn, .capture-signature-btn {
              display: none; /* Ensure signature buttons are hidden in the PDF */
            }
            .wcc {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .inspection-body p {
              margin: 0;
              padding: 5px 0;
            }
            .declaration {
              padding: 10px 0;
            }
            /* Add more specific styles here as needed */
          </style>
        </head>
        <body>
          ${content1}
          
        </body>
      </html>
    `
  };

  // Make the HTTP POST request to generate the PDF
  this.http.post<{ id: number }>(`${environment.serverUrl}create_pdf`, body)
    .subscribe(
      (response) => {
        this.pdfId = response.id;
        console.log('PDF generation successful, ID:', this.pdfId);
        this.downloadPDF(this.pdfId); // Trigger PDF download
      },
      (error) => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again later.');
      }
    );
}











  parseInspectorArray(request: any): InspectorInfo {
    let inspectorInfo: InspectorInfo = {
      units: 0,
      fromDate: '',
      toDate: ''
    };
    const name = sessionStorage.getItem('UserName') as string;
  
    const nameToFind = name; // Replace this with the name you want to find
  
    if (request && request.inspector_array) {
      const inspectorArray = JSON.parse(request.inspector_array);
  
      // Iterate through the inspector_array
      for (const inspector of inspectorArray) {
        if (inspector.name === nameToFind && inspector.units) {
          console.log('insp name array',inspector.name);
          
          inspectorInfo.units = inspector.units;
          inspectorInfo.fromDate = inspector.fromDate;
          inspectorInfo.toDate = inspector.toDate;
          break; // Break the loop once the desired inspector is found
        }
      }
    }
  
    return inspectorInfo;
  }
  
  getFromDate(request: any): string {
    const inspectorInfo = this.parseInspectorArray(request);
    return inspectorInfo.fromDate;
  }
  
  getToDate(request: any): string {
    const inspectorInfo = this.parseInspectorArray(request);
    return inspectorInfo.toDate;
  }

  getUnits(request:any) {
    const inspectorInfo = this.parseInspectorArray(request);
    return inspectorInfo.units;
  }
  
 
  
 

  
  downloadPDF(pdfId: number) {
    // Make the HTTP GET request to retrieve the PDF
    this.http.get(`${environment.serverUrl}get-pdf/${pdfId}`, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          // Create a link element to download the PDF
          const url = window.URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${this.formData.building_name}-Work_Completion_Certificate.pdf`; // Set the default name for the downloaded file
          link.click();
          window.URL.revokeObjectURL(url); // Clean up the URL object
        },
        (error) => {
          console.error('Error retrieving PDF:', error);
          alert('Error retrieving PDF. Please try again later.');
        }
      );
  }
  
  
  

  view_wcc() {
    if (this.pdfId) {
      this.http.get(`${environment.serverUrl}get-pdf/${this.pdfId}`, { responseType: 'blob' })
        .subscribe(
          (response: Blob) => {
            this.displayPDF(response);
            console.log('PDF retrieved successfully:', response);
          },
          (error) => {
            console.error('Error retrieving PDF:', error);
            alert('Error retrieving PDF. Please try again later.');
          }
        );
    } else {
      alert('No PDF ID available.');
    }
  }


  displayPDF(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const pdfWindow = window.open(url, '_blank');
    if (!pdfWindow) {
      alert('Unable to open PDF in a new tab. Please check your popup blocker settings.');
    }
  }







  signaturePadOptions: Object = { 
    'minWidth': 1.0, 
    'maxWidth': 1.5, 
    'canvasWidth': 270,
    'canvasHeight': 110,
    'penColor': 'black'
  };
  
  drawComplete() {
    if (this.signaturePad) {
      this.signature = this.signaturePad.toDataURL();
      console.log('Signature captured:', this.signature);
    }
  }
  
  // captureSignature() {
  //   if (this.signaturePad && !this.signaturePad.isEmpty()) {
  //     this.signature = this.signaturePad.toDataURL();
  //     console.log('Captured Signature:', this.signature);
  //     window.alert('Signature saved successfully!');
  //   } else {
  //     console.log('No signature detected!');
  //   }
  // }


  captureSignature() {
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      this.signature = this.signaturePad.toDataURL('image/png'); // Capture signature as Base64 image
      this.isSignatureCaptured = true; // Hide signature pad and show image
      console.log('Captured Signature:', this.signature);
      // window.alert('Signature saved successfully!');
    } else {
      console.log('No signature detected!');
    }
  }

  clearSignature() {
    this.signaturePad.clear(); // Clear the signature pad
    this.isSignatureCaptured = false; // Show signature pad again if needed
  }
  
}  