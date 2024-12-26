import {ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed-back-fill',
  templateUrl: './feed-back-fill.component.html',
  styleUrls: ['./feed-back-fill.component.scss']
})
export class FeedBackFillComponent {
  uploadFiles: any[] = [];
  isLoading = true;
  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private router:Router,private route:ActivatedRoute,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchUploadFiles();
  }
  fetchUploadFiles() {
    const value = sessionStorage.getItem('UserName') as string;
    console.log('UserName:', value); // Log to check the value
  
    if (!value) {
      console.error('No UserName found in sessionStorage');
      return; // Exit if UserName is missing
    }
  
    this.isLoading = true; // Start loading indicator
  
    const apiUrl = `${environment.serverUrl}api/feed_back_fetch?encodedValue=${encodeURIComponent(value)}`;
    console.log('API URL:', apiUrl);
  
    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.uploadFiles = data;
        console.log('Full data is', this.uploadFiles);
  
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually
        }, 1000);
      },
      error => {
        console.error('Error fetching data:', error); // Handle error
        this.isLoading = false;
      }
    );
  }

  displayPDF(document_id:string){
    if (document_id) {
      this.router.navigate(['afterlogin','feedback', document_id]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:');
    }
  }


}