import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrls: ['./view-certificate.component.scss']
})
export class ViewCertificateComponent {

  uploadFiles: any[] = [];

  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchUploadFiles();
  }

  fetchUploadFiles() {
    const value = sessionStorage.getItem('UserName') as string;
    this.http.get<any[]>(`${environment.serverUrl}api/upload_files_fetch?encodedValue=${value}`).subscribe(
      data => {      this.uploadFiles = data;
      console.log('full data is',this.uploadFiles);
    });
  }

  // displayPDF(unit_name:string,document_id:string,id:string,contract:string){
  //   if (unit_name) {
  //     this.router.navigate(['view_c', unit_name,document_id,id,contract]).then(
  //       () => console.log('Navigation successful'),
  //       (error) => console.error('Navigation failed:', error)
  //     );
  //   } else {
  //     console.error('Invalid unit value:', unit_name);
  //   }
  // }

  displayPDF(document_id:string,unit_name:string){
    if (document_id) {
      this.router.navigate(['pdf_c', document_id,unit_name]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', document_id);
    }
  }


  
 

}
