import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApicallService } from 'src/app/apicall.service';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {
  isChecked = false;
  dataArray1: any[] = [];

 
  
  items: { name: string, checked: boolean }[] = [];
  checkedItems: string[] = []; // Array to store checked item names
  uncheckedItems: string[] = []; // Array to store unchecked item names

  checkedCount = 0;
  uncheckedCount = this.items.length;

 
  //standard elevators
  elevator_json =JSON.parse(this.dataService.selectedDetails.elevator_values);
  elevator=this.elevator_json.elevator_names;

  //home elevator values
  home_json =JSON.parse(this.dataService.selectedDetails.home_elevator_values);
  home=this.home_json.home_names;


  //dumb elevator values
  dumb_json =JSON.parse(this.dataService.selectedDetails.dump_values);
  dumb=this.dumb_json.dump_names;

//car parking
car_json =JSON.parse(this.dataService.selectedDetails.car_parking_values);
car_parking=this.car_json;

//escalator 
escalator_json =JSON.parse(this.dataService.selectedDetails.escalator_values);
escalator=this.escalator_json;


//moving walk names
mw_json =JSON.parse(this.dataService.selectedDetails.mw_values);
moving_walk=this.mw_json;


  travelator=this.dataService.travelator_values;

  itemNames =this.dataService.inspector_names;

  updateTotals() {
    this.checkedCount = this.items.filter(item => item.checked).length;
    this.uncheckedCount = this.items.length - this.checkedCount;
    this.dataService.setCheckedCount(this.checkedCount);
    this.dataService.unCheckedCount=this.uncheckedCount;
    this.dataService.total_items=this.itemNames;

    // Update the checkedItems and uncheckedItems arrays
    this.checkedItems = this.items.filter(item => item.checked).map(item => item.name);
    this.dataService.inspector_list=this.checkedItems;
    this.dataService.total_checked_items=this.checkedItems;
    this.uncheckedItems = this.items.filter(item => !item.checked).map(item => item.name);
    this.dataService.total_unchecked_items=this.uncheckedItems;
  }
  constructor(private dataService:ApicallService) {


  }
  viewDetails() {
    // Implement the logic to show service details, e.g., open a modal or navigate to a details page.
 
 
   
  }

  ngOnInit() {
 
   this.items = this.itemNames.map(name => ({ name, checked: false }));

    this.updateTotals();
    this.printItems();

    // this.dataService.leaveData().subscribe((response: any) => {
    //   console.log(response); // Log the response to the console
    //   this.dataArray1 = response;
    // });

    // this.dataArray1=[{"date":"2023-12-10","names":["samplename"]},{"date":"2023-12-15","names":["samplename"]},{"date":"2023-12-01","names":["samplename","samplename2"]},{"date":"2023-12-02","names":["samplename"]}];
  }

  printItems() {
    console.log('Checked Items:', this.checkedItems);
    console.log('Unchecked Items:', this.uncheckedItems);
    console.log('checked count:',this.checkedCount);
    console.log('unchecked count:',this.uncheckedCount);
    
    
  }


}
