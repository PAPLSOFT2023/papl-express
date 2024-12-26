import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-pdf-report',
  templateUrl: './upload-pdf-report.component.html',
  styleUrls: ['./upload-pdf-report.component.scss']
})
export class UploadPdfReportComponent {
  document_id: string | null | any = '';
selectedFiles: { [unit: string]: File | null } = {}; // Store selected files for each unit
units: string[] | any = [];
val: string | null = '';

constructor(
  private route: ActivatedRoute,
  private dataService: ApicallService,
  private http: HttpClient,
  private router: Router
) {
  this.document_id = sessionStorage.getItem('document_id');
  console.log('document id is ', this.document_id);
  this.route.paramMap.subscribe(params => {
    this.val = params.get('c_no');
    console.log(this.val);
    if (this.val) {
      // sessionStorage.setItem('document_id', this.val); 
    }
  });
}

ngOnInit() {
  const value = this.val;
  // const inspector = `http://localhost:3000/api/fetch_units_r?encodedValue=${value}`;

  // this.http.get<string[]>(inspector).subscribe(
  //   (data: string[]) => {
  //     this.units = JSON.parse(data[0]); // Assuming the response is always an array with one element
  //     console.log(this.units);
  //     console.log('my data is', data);
  //   },
  //   error => {
  //     console.error(error);
  //   }
  // );
  const inspector = `${environment.serverUrl}api/fetch_units_r?encodedValue=${value}`;
this.http.get<any[]>(inspector).subscribe(
  (data: any[]) => {
    this.units = data; // Assuming the response is an array of arrays
    console.log('My data is', this.units);
  },
  error => {
    console.error(error);
  }
);

}

proceed(unit: string) {
  console.log("Clicked on unit:", unit);

  if (unit) {
    this.router.navigate(['certificate', unit, this.val]).then(
      () => console.log('Navigation successful'),
      (error) => console.error('Navigation failed:', error)
    );
  } else {
    console.error('Invalid unit value:', unit);
  }
}

onFileSelected(event: any, unit: string) {
  const files = event.target.files;
  if (files) {
    this.selectedFiles[unit] = files.item(0);
  }
}

triggerFileInput(unit: string) {
  const fileInput = document.getElementById('fileInput' + unit) as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
}

uploadPDF(unit: string) {
  const value = sessionStorage.getItem('UserName') as string;

  const file = this.selectedFiles[unit];
  if (file) {
    const formData = new FormData();
    formData.append('inspector_name',value);
    formData.append('file', file);
    formData.append('unit_name', unit);
    formData.append('document_id', this.val || '');
    formData.append('building_name', sessionStorage.getItem('building_name') || '');
    formData.append('contract', sessionStorage.getItem('contract') || '');

    this.http.post(`${environment.serverUrl}api/upload_report`, formData, { responseType: 'text' }).subscribe(      (response: any) => {
        console.log('File upload response:', response);
        alert(response); // Display the response text
        // Optionally, handle response or navigate to another page
      },
      error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.'); // Alert or display error message
      }
    );
  }
}



}
