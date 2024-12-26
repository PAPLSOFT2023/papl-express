import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent {
  selectedFile: File | null = null;
  lastSubProductId: number | null = null;
  lastSubProductList: any[] = []; // For storing last sub product master data
  uploadMetadataList: any[] = []; // For storing excel upload metadata
  editMetadata: any = null; // For holding metadata to be edited

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchLastSubProductList();
    this.fetchUploadMetadataList();
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile && this.lastSubProductId) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('lastSubProductId', this.lastSubProductId.toString());
  
      this.http.post('http://localhost:3000/api/upload-excel', formData, { responseType: 'text' })
        .subscribe({
          next: (res) => {
            console.log('File uploaded successfully!', res);
            this.fetchUploadMetadataList(); // Refresh the list after upload
          },
          error: (err) => console.error('Upload failed!', err)
        });
    } else {
      alert('Please select a file and enter a valid last_sub_product ID');
    }
  }

  fetchLastSubProductList() {
    this.http.get<any[]>('http://localhost:3000/api/lastsubproduct').subscribe(
      (data) => this.lastSubProductList = data,
    
      (error) => console.error('Error fetching last sub product master:', error)
    );
  }

  fetchUploadMetadataList() {
    this.http.get<any[]>('http://localhost:3000/api/excel-upload-metadata').subscribe(
      (data) => this.uploadMetadataList = data,
      (error) => console.error('Error fetching upload metadata:', error)
    );
  }

  prepareUpdate(metadata: any) {
    this.editMetadata = { ...metadata }; // Copy the current metadata for editing
  }

  updateMetadata() {
    if (this.editMetadata) {
      this.http.put(`http://localhost:3000/api/excel-upload-metadata/${this.editMetadata.id}`, this.editMetadata).subscribe({
        next: (res) => {
          console.log('Metadata updated successfully!', res);
          this.fetchUploadMetadataList(); // Refresh the list after updating
          this.editMetadata = null; // Clear the edit state
        },
        error: (err) => console.error('Update failed!', err)
      });
    } else {
      alert('Please select a metadata to update.');
    }
  }

  deleteMetadata(metadataId: number) {
    if (confirm('Are you sure you want to delete this metadata?')) {
      this.http.delete(`http://localhost:3000/api/excel-upload-metadata/${metadataId}`).subscribe({
        next: (res) => {
          console.log('Metadata deleted successfully!', res);
          this.fetchUploadMetadataList(); // Refresh the list after deletion
        },
        error: (err) => console.error('Deletion failed!', err)
      });
    }
  }
  

}
