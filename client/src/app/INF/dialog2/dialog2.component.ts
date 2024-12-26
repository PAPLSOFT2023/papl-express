import { Component,Input} from '@angular/core';
import { Dialog3Component } from '../dialog3/dialog3.component';
import { MatDialog } from '@angular/material/dialog';
import { ApicallService } from 'src/app/apicall.service';
import { Dialog4Component } from '../dialog4/dialog4.component';
import { Dialog5Component } from '../dialog5/dialog5.component';
import { Dialog6Component } from '../dialog6/dialog6.component';
import { Dialog7Component } from '../dialog7/dialog7.component';
import { Dialog8Component } from '../dialog8/dialog8.component';
import { Dialog9Component } from '../dialog9/dialog9.component';

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})
export class Dialog2Component  {

  selectedDetails:string[] | any=this.dataService.selectedDetails;
  elevator_num=0;
  total_num = 0;
  final_count:number=0;
  //  elevator_count:number=0;


   
  // const elevatorCount: number = this.selectedDetails.no_of_elevator;


   
  
  constructor(private dialog:MatDialog,public dataService: ApicallService){
   this.elevator_num=this.dataService.total_count;
  this.total_num = this.dataService.no_of_units;

   
    


  }
  
  ngOnInit(): void {
    
  }
  view(): void {
    console.log(this.dataService.total_units);
    console.log('standard elevator', this.dataService.total_count);
  
    this.final_count = this.dataService.total_count + this.dataService.hydra_elevator + this.dataService.dumb_waiter + this.dataService.car_parking + this.dataService.escalator + this.dataService.moving_walk + this.dataService.travelator;
  
    console.log(this.final_count);
  
    if (this.dataService.total_units != this.final_count) {
      alert("Error: Unit Values doesn't match!");
    } else {
      // alert("no error")
      // If the values match, close the dialog
      // If you have a reference to MatDialogRef, you can use it to close the dialog
      // For example:
      // this.dialogRef.close();
      // Replace 'this.dialogRef' with the actual reference to your MatDialogRef
    }
  }
 
  

  openDialog3() {
    const dialogRef = this.dialog.open(Dialog3Component);
    dialogRef.afterClosed().subscribe(() => {
      // alert('this is new dialog!!');
      // console.log(this.dataService.total_count);
      console.log(this.selectedDetails);
      
      
      
      
     
      
    });

    
  }
  openDialog4() {
    const dialogRef = this.dialog.open(Dialog4Component);
    dialogRef.afterClosed().subscribe(() => {
      // alert('this is new dialog!!');
      // console.log(this.dataService.hydra_elevator);
      
      
     
      
    });
  
  
  
  

  }
  openDialog5() {
    const dialogRef = this.dialog.open(Dialog5Component);
    dialogRef.afterClosed().subscribe(() => {
      // alert('this is new dialog!!');
      console.log("dumb",this.dataService.dumb_waiter);
      
      
     
      
    });
  
  
  
  

  }


  openDialog6(){
    const dialogRef = this.dialog.open(Dialog6Component);
    dialogRef.afterClosed().subscribe(() => {
     
    });

  }


openDialog7(){
  const dialogRef = this.dialog.open(Dialog7Component);
  dialogRef.afterClosed().subscribe(() => {
   
    });

  }
openDialog8(){
  const dialogRef = this.dialog.open(Dialog8Component);
  dialogRef.afterClosed().subscribe(() => {
   
    });

  }
openDialog9(){
  const dialogRef = this.dialog.open(Dialog9Component);
  dialogRef.afterClosed().subscribe(() => {
   
    });

  }

checkCounts() {
  if (this.elevator_num !== this.total_num) {
    alert('Elevator count and total count of units are not equal!');
    // You can also perform other actions here based on your requirements
  }
  console.log('elvator',this.elevator_num,'total',this.total_num);
  
}


}
