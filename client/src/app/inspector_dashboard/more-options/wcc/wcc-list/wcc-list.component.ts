import { ChangeDetectorRef,Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-wcc-list',
  templateUrl: './wcc-list.component.html',
  styleUrls: ['./wcc-list.component.scss']
})
export class WccListComponent {
  uploadFiles: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private router:Router,private route:ActivatedRoute,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchUploadFiles();
  }



fetchUploadFiles() {
  const value = sessionStorage.getItem('UserName') as string;

  if (!value) {
    console.error('No UserName found in sessionStorage');
    return;
  }

  this.isLoading = true; // Start loading indicator

  const apiUrl = `${environment.serverUrl}api/pending?encodedValue=${encodeURIComponent(value)}`;
  console.log('API URL:', apiUrl); // Log URL

  this.http.get<any[]>(apiUrl).subscribe(
    data => {
      this.uploadFiles = data;
      console.log('Full data is', this.uploadFiles);

      // Simulate some loading time (optional)
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.detectChanges(); // Trigger change detection manually if needed
      }, 3000);
    },
    error => {
      console.error('Error fetching data:', error);
      this.isLoading = false; // Stop loading indicator on error
    }
  );
}

  displayPDF(document_id:string,contract_number:string){
    if (document_id) {
      this.router.navigate(['afterlogin','wcc-list',contract_number,document_id]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:');
    }
  }


}


