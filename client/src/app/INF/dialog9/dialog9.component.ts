import { Component } from '@angular/core';
// import { DataService } from '../data.service';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog9',
  templateUrl: './dialog9.component.html',
  styleUrls: ['./dialog9.component.css']
})
export class Dialog9Component {
  repeatCount=this.dataService.travelator;
  travelator_fieldValues: string[] = [];

  updateLiftFieldValue(index: number, value: string) {
    this.travelator_fieldValues[index] = value;
  }


  constructor(private dataService: ApicallService,private http :HttpClient ){

  
    dataService.travelator_values = this.travelator_fieldValues;
    
    
   
    
    


  }


}
