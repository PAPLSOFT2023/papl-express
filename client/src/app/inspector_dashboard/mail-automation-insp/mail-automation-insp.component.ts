import {ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mail-automation-insp',
  templateUrl: './mail-automation-insp.component.html',
  styleUrls: ['./mail-automation-insp.component.scss']
})
export class MailAutomationInspComponent {
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
    const value = sessionStorage.getItem('UserName') as string;
    console.log('inspector name is',value);
    
    const inspector = `${environment.serverUrl}api/pending?encodedValue=${value}`;
        this.http.get<any[]>(inspector) // Replace with your server endpoint
      .subscribe(data => {
        this.unitDetails = data;
        console.log('unit details is',this.unitDetails);
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually if needed
        }, 1000);
       
        
      });
  }
  proceed(document_id:string,contract_number:string,unit_no:string[]){

    sessionStorage.setItem('contract_no',contract_number);
    sessionStorage.setItem('document_id',document_id);
    this.router.navigate(['afterlogin', 'unit',document_id]);
    // sessionStorage.setItem('unit_values', JSON.stringify(unit_no)); 


    

  }


}
