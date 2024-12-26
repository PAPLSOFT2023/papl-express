import { Component } from '@angular/core';
// import { DataService } from '../data.service';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog6',
  templateUrl: './dialog6.component.html',
  styleUrls: ['./dialog6.component.css']
})
export class Dialog6Component {
  repeatCount=this.dataService.car_parking;
  car_fieldValues: string[] = [];

  updateLiftFieldValue(index: number, value: string) {
    this.car_fieldValues[index] = value;
  }


  constructor(private dataService: ApicallService,private http :HttpClient ){

  
    dataService.car_parking_values= this.car_fieldValues;
    
    
   
    
    


  }

}
