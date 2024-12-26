import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignaturePad } from 'angular2-signaturepad';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed-back-form',
  templateUrl: './feed-back-form.component.html',
  styleUrls: ['./feed-back-form.component.scss']
})
export class FeedBackFormComponent {
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  val: string | null = '';
  name: string = '';
  designation: string = '';
  contactNo: string = '';
  emailId: string = '';
  signature: string = ''; // Ensure this is properly captured

  option1: string = '';
  option2: string = '';
  option3: string = '';
  option4: string = '';
  option5: string = '';
  
  ratings: number[][] = [
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0]  
  ];

  lastClickedIndex: number[] = [-1, -1, -1, -1, -1];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
    });
  }

  rate(questionIndex: number, starIndex: number) {
    this.ratings[questionIndex] = this.ratings[questionIndex].map((value, index) => index <= starIndex ? 1 : 0);
    this.lastClickedIndex[questionIndex] = starIndex;
  }

  getLastCheckedText(questionIndex: number): string {
    const lastClicked = this.lastClickedIndex[questionIndex];
    const textMap = ["Poor", "Average", "Good", "Very Good", "Excellent"];
    return lastClicked !== -1 ? textMap[lastClicked] : ''; 
  }

  isInputEnabled(questionIndex: number): boolean {
    const sumOfRatings = this.ratings[questionIndex].reduce((acc, rating) => acc + rating, 0);
    return sumOfRatings < 5;
  }


  check() {
    console.log('Signature captured:', this.signature);

    console.log('ans is', this.ratings);

    const inputData = {
      name: this.name,
      designation: this.designation,
      contactNo: this.contactNo,
      emailId: this.emailId,
      signature: this.signature // Ensure the signature is properly captured
    };

    const options = {
      option1: this.option1,
      option2: this.option2,
      option3: this.option3,
      option4: this.option4,
      option5: this.option5
    };

    console.log('Input Data:', inputData);
    console.log('Options:', options);

    const storeValues = {
      rating: this.ratings,
      customer_details: inputData,
      options: options,
      document_id: this.val
    };

    this.http.put(`${environment.serverUrl}api/update_data_feedback`, storeValues).subscribe(
      (response) => {
        if (confirm('Done..!')) {
          this.router.navigate(['afterlogin', 'more_options']);
        }
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );
  }

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 300,
    'canvasHeight': 150,
    'penColor': 'black' 
  };

  // Method when signature drawing is complete
  drawComplete() {
    if (this.signaturePad) {
      this.signature = this.signaturePad.toDataURL(); // Save the signature as base64 image
      console.log('Signature captured:', this.signature); // Check if signature is captured
    }
  }
  
  // Method to clear the signature
  clearSignature() {
    if (this.signaturePad) {
      this.signaturePad.clear();
      this.signature = ''; // Clear the signature value
    }
  }


  captureSignature() {
    if  (this.signaturePad && !this.signaturePad.isEmpty() ) {
      this.signature = this.signaturePad.toDataURL(); // Save the signature as base64
      console.log('Captured Signature:', this.signature);
      window.alert('Signature saved successfully!'); // Show alert


    } else {
      console.log('No signature detected!');
    }
  }
  

  
}
