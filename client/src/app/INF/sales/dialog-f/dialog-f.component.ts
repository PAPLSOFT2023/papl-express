import { Component,OnInit,Input } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-f',
  templateUrl: './dialog-f.component.html',
  styleUrls: ['./dialog-f.component.scss']
})
export class DialogFComponent {
  stops_fieldValues: number[] = [];
  lift_fieldValues: string[] = [];
  usage_fieldValues:string[]= [];
  type_fieldValues:string[]= [];
  selectedDetails:string[] | any=this.dataService.selectedDetails;


  

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


  // calculateSum(): number {
  //   return this.stops_fieldValues.reduce((acc, currentValue) => acc + currentValue, 0);
  // }
  
  


  type_values:string[]=[];
  type_usages:string[]=[];
  
  repeatCount=this.selectedDetails.no_of_elevator

  

  


   

  constructor(private dataService: ApicallService,private http :HttpClient ){

  
    dataService.elevator_names = this.lift_fieldValues;
    dataService.elevator_usage = this.usage_fieldValues;
    dataService.elevator_type=this.type_fieldValues;
    dataService.elevator_stops=this.stops_fieldValues;
    
   
    
    


  }
  
  
  ngOnInit(): void {
    const type_url = `${environment.serverUrl}api/elevator_type`;
        this.http.get<string[]>(type_url).subscribe((data) => {
      this.type_values = data;
    });

    const usage_url = `${environment.serverUrl}api/elevator_usages`;
        this.http.get<string[]>(usage_url).subscribe((data) => {
      this.type_usages = data;
    });


    
    
  }
  submitForm() {
    // Now, this.fieldValues contains all the field values as an array
    console.log(this.stops_fieldValues);
    // const stops_sum = this.calculateSum();
    // console.log('sum stops',stops_sum);
    console.log('lift',this.lift_fieldValues);
    console.log('usage',this.usage_fieldValues);
    console.log('type',this.type_fieldValues);


    console.log('checking service',this.dataService.elevator_names);
    console.log('check usage',this.dataService.elevator_usage);
    console.log('check type',this.dataService.elevator_type);
    console.log('check stops',this.dataService.elevator_stops);
    console.log('sum',this.dataService.calculateSum());
    
    
    
    
    
    
    
    
    
    
  }


}
