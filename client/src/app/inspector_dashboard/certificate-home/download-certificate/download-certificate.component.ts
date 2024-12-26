import { Component,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-certificate',
  templateUrl: './download-certificate.component.html',
  styleUrls: ['./download-certificate.component.scss']
})
export class DownloadCertificateComponent {
  name:string|null ='';
  isLoading = true;
  unitDetails: any[] = [];
  constructor(private router: Router,private http: HttpClient,private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.loadUnitDetails();
    console.log('pending',this.unitDetails);
    this.name = sessionStorage.getItem('UserName') as string;
    
    
    
  }
  loadUnitDetails() {
    const value = sessionStorage.getItem('UserName') as string;
    console.log('inspector name is',value);
    
    const inspector = `${environment.serverUrl}api/pending?encodedValue=${value}`;
        this.http.get<any[]>(inspector) // Replace with your server endpoint
      .subscribe(data => {
        this.unitDetails = data;
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually
        }, 2000);
      });
  }
  proceed(document_id:string,contract_number:string){
    sessionStorage.setItem('contract',contract_number);
    
    this.router.navigate(['afterlogin', 'pre_ins',document_id]);

    

  }

}
