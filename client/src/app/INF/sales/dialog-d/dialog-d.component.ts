import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApicallService } from 'src/app/apicall.service';
import { DialogFComponent } from '../dialog-f/dialog-f.component';

@Component({
  selector: 'app-dialog-d',
  templateUrl: './dialog-d.component.html',
  styleUrls: ['./dialog-d.component.scss']
})
export class DialogDComponent {
  constructor(public dataService:ApicallService, private dialog:MatDialog){

  }
  selectedDetails:string[] | any=this.dataService.selectedDetails;
  openDialog3() {
    const dialogRef = this.dialog.open(DialogFComponent);
    dialogRef.afterClosed().subscribe(() => {
      // alert('this is new dialog!!');
      // console.log(this.dataService.total_count);
      console.log(this.selectedDetails);
      
      
      
      
     
      
    });

    
  }

}