import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-key-abstract-units',
  templateUrl: './key-abstract-units.component.html',
  styleUrls: ['./key-abstract-units.component.scss']
})
export class KeyAbstractUnitsComponent {
  document_id:string | null='';

  units:string[] | any=[];
  val:string|null ='';
  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router){
    // this.document_id = sessionStorage.getItem('document_id');
    // console.log('document id is ',this.document_id);
    this.document_id = this.route.snapshot.paramMap.get('document_id');
    this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        // sessionStorage.setItem('document_id', this.val); 
      }


      
    });
    

  }
  ngOnInit(){
  
    const value=this.val;
  
    
    const inspector = `${environment.serverUrl}api/fetch_units?encodedValue=${value}`;  
  this.http.get<string[]>(inspector).subscribe(
    (data: string[]) => {
      this.units = JSON.parse(data[0]); // Assuming the response is always an array with one element
      console.log(this.units);
      console.log('my data is',data);
    },
    error => {
      console.error(error);
    }
  );
  
  
  
  }
  
  proceed(unit: string) {
    console.log("Clicked on unit:", unit);
  
if (unit) {
      this.router.navigate(['key_abstract', unit,this.val,this.document_id]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

}