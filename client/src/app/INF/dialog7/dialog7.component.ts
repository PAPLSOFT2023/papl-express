import { Component } from '@angular/core';
// import { DataService } from '../data.service';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog7',
  templateUrl: './dialog7.component.html',
  styleUrls: ['./dialog7.component.css']
})
export class Dialog7Component {
  repeatCount=this.dataService.escalator;
  escalator_fieldValues: string[] = [];

  updateLiftFieldValue(index: number, value: string) {
    this.escalator_fieldValues[index] = value;
  }


  constructor(private dataService: ApicallService,private http :HttpClient ){

  
    dataService.escalator_values= this.escalator_fieldValues;
    
    
   
    
    


  }

}
