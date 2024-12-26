import { Component,OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog4',
  templateUrl: './dialog4.component.html',
  styleUrls: ['./dialog4.component.css']
})
export class Dialog4Component implements OnInit {
  repeatCount_hydra=this.dataService.hydra_elevator;
  type_values:string[]=[];
  type_usages:string[]=[];



  stops_fieldValues: number[] = [];
  lift_fieldValues: string[] = [];
  usage_fieldValues:string[]=[];
  type_fieldValues:string[]=[];


  

  // Function to handle changes in the input fields function for stops
  updateFieldValue(index: number, value: number) {
    this.stops_fieldValues[index] = value;
  }

//function for lift name
  updateLiftFieldValue(index: number, value: string) {
    this.lift_fieldValues[index] = value;
  }


  //function for usage name
  updateUsageFieldValue(index: number, value: string) {
    this.usage_fieldValues[index] = value;
  }


  //function for type values
  updateTypeFieldValue(index: number, value: string) {
    this.type_fieldValues[index] = value;
  }


   

  constructor(private dataService: ApicallService,private http:HttpClient){
    
    dataService.home_names = this.lift_fieldValues;
    dataService.home_usage = this.usage_fieldValues;
    dataService.home_type=this.type_fieldValues;
    dataService.home_stops=this.stops_fieldValues;
    
   
    
    


  }
  
  ngOnInit(): void {
    const type_url = `${environment.serverUrl}api/home_type`;
        this.http.get<string[]>(type_url).subscribe((data) => {
      
      this.type_values = data;
    });

    const usage_url = `${environment.serverUrl}api/home_usages`;
        this.http.get<string[]>(usage_url).subscribe((data) => {
      this.type_usages = data;
    });

    
    
  }
  submitForm() {
    // Now, this.fieldValues contains all the field values as an array

console.log(this.dataService.home_names);
console.log(this.dataService.home_type);
console.log(this.dataService.home_usage);
console.log(this.dataService.home_stops);
console.log(this.dataService.calculateSum1());






    
    
    
    
    
    
    
    
    
    
    
  }

}
