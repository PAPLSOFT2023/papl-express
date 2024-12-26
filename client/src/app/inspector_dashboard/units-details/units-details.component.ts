import { Component,Inject } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
// import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';


import { DatePipe } from '@angular/common';
import { HttpClient ,HttpErrorResponse,HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-units-details',
  templateUrl: './units-details.component.html',
  styleUrls: ['./units-details.component.scss']
})
export class UnitsDetailsComponent {
  val: string | null = ''; 
  building_name:string|null='';
  site_location:string|null='';
  pincode:string|null='';
  // repeatCount=this.dataService.recordCount;

moving_walk_fieldValues: string[] = [];
inputInteracted: boolean[] = [];
latitude: string = '';
  longitude: string = '';

updateLiftFieldValue(index: number, value: string) {
  this.moving_walk_fieldValues[index] = value;
}
  
// validateInputs(): void {
//   this.inputInteracted = this.moving_walk_fieldValues.map(value => !!value);
// }

// areInputsInteracted(): boolean {
//   return this.inputInteracted.length === this.arrayFromVal().length &&
//          this.inputInteracted.every(interacted => interacted);
// }


  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient) {
    // this.route.paramMap.subscribe(params => {
    //   this.val = params.get('c_no');
    //   console.log(this.val);
      
    // });

    dataService.unit_values= this.moving_walk_fieldValues;
    this.val=this.data.val;
    this.building_name=this.data.building_name;
    this.pincode=this.data.pincode;
    this.site_location=this.data.location;
    console.log('final val is ',this.val);
    

  }
  arrayFromVal(): any[] {
    return Array.from({ length: Number(this.val) });
  }

  validateInputs(): void {
    this.inputInteracted = this.moving_walk_fieldValues.map(value => !!value);
  }

  areInputsInteracted(): boolean {
    return this.inputInteracted.length === this.arrayFromVal().length &&
           this.inputInteracted.every(interacted => interacted);
  }

  // Function to fetch the user's location
  fetchLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude.toString();
          this.longitude = position.coords.longitude.toString();
          console.log(`Location fetched: ${this.latitude}, ${this.longitude}`);
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Unable to fetch location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  // Function to submit the lifts along with the location
  submitLifts(): void {
    const lifts = this.moving_walk_fieldValues;
    const location = {
      latitude: parseFloat(this.latitude),
      longitude: parseFloat(this.longitude)
    };

    const data = { lifts, location,
      site_location:this.site_location,
      building_name: this.building_name, // From the data passed in the constructor
      pincode: this.pincode,  
     };

    // POST request to your backend API to store lifts and location
    this.http.post(`${environment.serverUrl}api/store-lifts`, data).subscribe(
      (response: any) => {
        console.log('Lifts saved successfully:', response);
        alert('Lifts saved successfully!');
      },
      (error: any) => {
        console.error('Error saving lifts:', error);
        alert('Failed to save lifts!');
      }
    );
  }
  
  ngOnInit() {
    this.fetchLocation();

   
  }

  
  

  
 
}



