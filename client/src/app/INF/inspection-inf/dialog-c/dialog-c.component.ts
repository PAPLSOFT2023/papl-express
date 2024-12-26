import { Component } from '@angular/core';
// import { Component,Input} from '@angular/core';
// import { Dialog3Component } from '../dialog3/dialog3.component';
import { MatDialog } from '@angular/material/dialog';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-dialog-c',
  templateUrl: './dialog-c.component.html',
  styleUrls: ['./dialog-c.component.css']
})
export class DialogCComponent {
  constructor(private dataService:ApicallService, private dialog:MatDialog){

  }
  selectedDetails:string[] | any=this.dataService.selectedDetails;


}
