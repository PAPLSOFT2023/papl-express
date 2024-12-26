import { Component, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';
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
  selector: 'app-closeout',
  templateUrl: './closeout.component.html',
  styleUrls: ['./closeout.component.scss']
})
export class CloseoutComponent implements AfterViewInit {

  val:string|null='';
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  @ViewChildren(SignaturePad) signaturePads!: QueryList<SignaturePad>;
  isDialogVisible = false;
  currentRowIndex: number | null = null;

  rows: Row[] = [{ name: '', designation: '', role: '', company: '', contact_number: '', signature: '' }];
  signature: string="";

  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
    this.route.paramMap.subscribe(params => {
     this.val = params.get('c_no');
     console.log(this.val);
     if(this.val){
     }
     
   });

 }

  ngAfterViewInit(): void {
  
  }


  show(): void {
    const store_values = {
      witness_details: this.rows,
      document_id:this.val
    };

    this.http.put(`${environment.serverUrl}api/update_data_close`, store_values).subscribe(
      (response) => {
        if (confirm('Data stored successfully!')) {
          console.log('Stored data:', response);
          this.router.navigate(['afterlogin', 'more_options']);

        }
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );
  }

  addRow(): void {
    this.rows.push({ name: '', designation: '', role: '', company: '', contact_number: '', signature: '' });
  }

  allFieldsFilled(): boolean {
    return this.rows.every(
      row =>
        row.name.trim() !== '' &&
        row.designation.trim() !== '' &&
        row.role.trim() !== '' &&
        row.company.trim() !== '' &&
        row.contact_number.trim() !== '' &&
        row.signature.trim() !== ''
    );
  }

  openDialog(rowIndex: number): void {
    this.currentRowIndex = rowIndex;
    this.isDialogVisible = true; // Ensure the dialog is visible
  }

  signaturePadOptions: Object = { 
  'minWidth': 1.0,   // Minimum width for finer lines
  'maxWidth': 1.5, 
      'canvasWidth': 250,
    'canvasHeight': 120,
    'penColor': 'black' 
  };

  drawComplete(rowIndex: number) {
    if (this.signaturePad) {
      this.signature = this.signaturePad.toDataURL();
      console.log('Signature captured for row', rowIndex, ':', this.signature);
    }
  }

  // Method to clear the signature
  clearSignature(rowIndex: number) {
    const signaturePad = this.signaturePads.toArray()[rowIndex]; // Get the specific signature pad
    if (signaturePad) {
      signaturePad.clear();
      // Optionally, reset any related signature value if you are tracking it
    }
  }

  // Method to capture and save the signature in the correct row
  captureSignature(rowIndex: number) {
    if (this.signaturePad && !this.signaturePad.isEmpty()) {
      this.signature = this.signaturePad.toDataURL(); // Capture signature as base64
      this.rows[rowIndex].signature = this.signature; // Save signature in the corresponding row
      console.log('Captured Signature for row', rowIndex, ':', this.signature);
      window.alert('Signature saved successfully!');
    } else {
      console.log('No signature detected!');
    }
  }
  validatePhoneNumber(event: any, index: number): void {
    const input = event.target.value;
  
    // Remove any non-digit characters
    const sanitizedInput = input.replace(/\D/g, '');
  
    // Check if the sanitized input has exactly 10 digits
    if (sanitizedInput.length === 10) {
      // Update the specific row's contact number with the sanitized input
      this.rows[index].contact_number = sanitizedInput;
    } else {
      // If the input is not exactly 10 digits, display an error or handle accordingly
      this.rows[index].contact_number = ''; // Clear the input (optional)
      console.error('Phone number must contain exactly 10 digits');
    }
  }
  

  allowOnlyNumbers(event: KeyboardEvent): void {
    // Allow only digits (0-9) and prevent typing anything else
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Tab'];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  
  
}
