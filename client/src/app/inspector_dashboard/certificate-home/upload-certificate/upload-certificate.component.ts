import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-certificate',
  templateUrl: './upload-certificate.component.html',
  styleUrls: ['./upload-certificate.component.scss']
})
export class UploadCertificateComponent {
  name:string|null ='';
  unitDetails: any[] = [];
  isLoading = true;
  constructor(private router: Router,private http: HttpClient,private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.loadUnitDetails();
    console.log('pending',this.unitDetails);
    this.name = sessionStorage.getItem('UserName') as string;
    
    
    
  }
 

  loadUnitDetails() {
    // Fetch the UserName from sessionStorage
    const value = sessionStorage.getItem('UserName');
  
    // Check if UserName exists
    if (!value) {
      console.error('UserName is missing from sessionStorage');
      return; // Exit if UserName is missing
    }
  
    // Log the retrieved UserName
    console.log('Inspector name is', value);
  
    // Construct the API URL
    const inspector = `${environment.serverUrl}api/pending?encodedValue=${encodeURIComponent(value)}`;
    console.log('API URL:', inspector);
  
    // Show loading indicator
    this.isLoading = true;
  
    // Make the HTTP GET request
    this.http.get<any[]>(inspector)
      .subscribe(
        data => {
          // Log the API response
          console.log('API response:', data);
  
          // Assign the response to unitDetails
          this.unitDetails = data;
  
          // Stop the loading indicator after a delay
          setTimeout(() => {
            this.isLoading = false;
            this.cdr.detectChanges(); // Manually trigger change detection
          }, 2000);
        },
        error => {
          // Log any errors
          console.error('Error fetching unit details:', error);
  
          // Stop the loading indicator in case of error
          this.isLoading = false;
        }
      );
  }
  
  
  proceed(document_id:string,contract_number:string,building_name:string){
    sessionStorage.setItem('contract',contract_number);
    sessionStorage.setItem('building_name',building_name);
    
    this.router.navigate(['afterlogin', 'upload_certificate',document_id]);

    

  }

}
