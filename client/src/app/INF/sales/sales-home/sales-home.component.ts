import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sales-home',
  templateUrl: './sales-home.component.html',
  styleUrls: ['./sales-home.component.css']
})
export class SalesHomeComponent {
  selectedOption:string='';
  values:string[]=[];
  constructor(private http:HttpClient,private router:Router){

  }
  ngOnInit(){
    const apiUrl = `${environment.serverUrl}api/job_type`;
        this.http.get<string[]>(apiUrl).subscribe((data) => {
      this.values = data;
    });
  }
  navigateToNewInspection() {
    if(this.selectedOption==='V'){
      this.router.navigate(['afterlogin/sales_v', this.selectedOption]);


    }
    else{
      this.router.navigate(['afterlogin/sales_inf', this.selectedOption]);


    }
  }

}
