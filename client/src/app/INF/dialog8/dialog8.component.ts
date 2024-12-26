import { Component } from '@angular/core';
// import { DataService } from '../data.service';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog8',
  templateUrl: './dialog8.component.html',
  styleUrls: ['./dialog8.component.css']
})
export class Dialog8Component {
  repeatCount=this.dataService.moving_walk;
  moving_walk_fieldValues: string[] = [];

  updateLiftFieldValue(index: number, value: string) {
    this.moving_walk_fieldValues[index] = value;
  }


  constructor(private dataService: ApicallService,private http :HttpClient ){

  
    dataService.moving_walk_values= this.moving_walk_fieldValues;
    
    
   
    
    


  }

}
