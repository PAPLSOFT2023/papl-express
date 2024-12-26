import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-images',
  templateUrl: './report-images.component.html',
  styleUrls: ['./report-images.component.scss']
})
export class ReportImagesComponent implements OnInit {

  images: any[] = []; // Array to hold the fetched images

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReportImages();
  }

  fetchReportImages(): void {
    const apiUrl = `${environment.serverUrl}get-report-images`; // The API endpoint
   
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log('Images fetched successfully:', response);
        this.images = response;  // Store the images in the component
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  // Method to convert the binary buffer into a Blob URL for download
  // getDownloadLink(zipFile: any): string {
  //   const blob = new Blob([new Uint8Array(zipFile.data)], { type: 'application/zip' });
  //   return URL.createObjectURL(blob);  // Creates a URL that can be used for downloading
  // }

  // Method to trigger the download when button is clicked
  downloadFile(id:number, fileName: string): void {
    const url = `${environment.serverUrl}api/download_report_image/${id}`;
    window.open(url, '_blank');

  }
}


