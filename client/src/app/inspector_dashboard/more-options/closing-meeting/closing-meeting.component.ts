import { ChangeDetectorRef,Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-closing-meeting',
  templateUrl: './closing-meeting.component.html',
  styleUrls: ['./closing-meeting.component.scss']
})
export class ClosingMeetingComponent {
  uploadFiles: any[] = [];
  isLoading = true;
  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private router:Router,private route:ActivatedRoute,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchUploadFiles();
  }

  fetchUploadFiles() {
    const value = sessionStorage.getItem('UserName') as string;
  
    if (!value) {
      console.error('No username found in sessionStorage');
      return;
    }
  
    this.isLoading = true; // Set loading state to true at the beginning of the call
  
    this.http.get<any[]>(`${environment.serverUrl}api/unit_fetch?encodedValue=${encodeURIComponent(value)}`)
      .subscribe(
        data => {    
          this.uploadFiles = data;
          console.log('Full data is', this.uploadFiles);
  
          // Optionally simulate some loading time, but it might not be necessary
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges(); // Trigger change detection manually if needed
          }, 1000);
        },
        error => {
          console.error('Error fetching upload files', error);
          this.isLoading = false; // Handle error state
        }
      );
  }
  

  displayPDF(document_id:string){
    if (document_id) {
      this.router.navigate(['afterlogin','closing_meeting', document_id]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:');
    }
  }

  

}