import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent {
  selectedFile: File | null = null;
  lastSubProductId: number | null = null;

  constructor(private http: HttpClient) {}

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile && this.lastSubProductId) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('lastSubProductId', this.lastSubProductId.toString());
  
      // Modify the request to expect a text response if the server is returning plain text
      this.http.post('http://localhost:3000/api/upload-excel', formData, { responseType: 'text' })
        .subscribe({
          next: (res) => {
            console.log('File uploaded successfully!', res);
            // If you want to handle the response as JSON, you can parse it here
            try {
              const jsonResponse = JSON.parse(res);
              console.log('Parsed response:', jsonResponse);
            } catch (e) {
              console.warn('Response is not JSON:', res);
            }
          },
          error: (err) => console.error('Upload failed!', err)
        });
    } else {
      alert('Please select a file and enter a valid last_sub_product ID');
    }
  }
  

}
