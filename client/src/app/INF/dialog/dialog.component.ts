import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  selectContract: string | null = '';
  public selectedDetails: any = {}; // Initialize selectedDetails as an empty object
  selectAllChecked = false; // Variable to track Select All checkbox state

  items: { name: string, checked: boolean }[] = [];
  checkedItems: string[] = []; // Array to store checked item names
  uncheckedItems: string[] = []; // Array to store unchecked item names

  checkedCount = 0;
  uncheckedCount = 0;

  // Elevator-related arrays
  elevatorNames: string[] = [];
  elevatorStops: number[] = [];
  elevator: string[] = [];

  // Home elevator-related arrays
  homeNames: string[] = [];
  homeStops: number[] = [];
  home: string[] = [];

  // Dumb elevator-related arrays
  dumbNames: string[] = [];
  dumbStops: string[] = [];
  dumb: string[] = [];

  // Other properties
  car_parking: any = [];
  escalator: any = [];
  moving_walk: any = [];
  travelator: any = [];

  // Combined item names array
  itemNames: string[] = [];

  constructor(private dataService: ApicallService) {}

  // Method to toggle all checkboxes
  toggleSelectAll() {
    this.items.forEach(item => {
      item.checked = this.selectAllChecked;
    });
    this.updateTotals();
  }

  updateTotals() {
    this.checkedCount = this.items.filter(item => item.checked).length;
    this.uncheckedCount = this.items.length - this.checkedCount;

    // Update service data
    this.dataService.setCheckedCount(this.checkedCount);
    this.dataService.unCheckedCount = this.uncheckedCount;

    // Update checked and unchecked items
    this.checkedItems = this.items.filter(item => item.checked).map(item => item.name);
    this.dataService.total_checked_items = this.checkedItems;

    this.uncheckedItems = this.items.filter(item => !item.checked).map(item => item.name);
    this.dataService.total_unchecked_items = this.uncheckedItems;

    // Update the "Select All" checkbox state based on individual item states
    this.selectAllChecked = this.items.every(item => item.checked);
  }

  ngOnInit() {
    console.log('contract no',this.selectContract);
    
    this.selectContract = sessionStorage.getItem('contract_no');
    console.log('contract no',this.selectContract);

    this.dataService.getDetailsForContractName(this.selectContract).subscribe((details: any) => {
      this.selectedDetails = details;
      console.log('dialog inf', this.selectedDetails);

      // Fetch and parse elevator values
      const elevatorJson = JSON.parse(this.selectedDetails.elevator_values);
      this.elevatorNames = elevatorJson.elevator_names;
      this.elevatorStops = elevatorJson.elevator_stops;
      this.elevator = this.elevatorNames.map((name, index) => name + ' - (' + this.elevatorStops[index] + ')');

      // Fetch and parse home elevator values
      const homeJson = JSON.parse(this.selectedDetails.home_elevator_values);
      this.homeNames = homeJson.home_names;
      this.homeStops = homeJson.home_stops;
      this.home = this.homeNames.map((name, index) => name + ' - (' + this.homeStops[index] + ')');

      // Fetch and parse dumb elevator values
      const dumbJson = JSON.parse(this.selectedDetails.dump_values);
      this.dumbNames = dumbJson.dump_names;
      this.dumbStops = dumbJson.dump_stops;
      this.dumb = this.dumbNames.map((name, index) => name + ' - (' + this.dumbStops[index] + ')');

      // Fetch and parse other values
      this.car_parking = JSON.parse(this.selectedDetails.car_parking_values);
      this.escalator = JSON.parse(this.selectedDetails.escalator_values);
      this.moving_walk = JSON.parse(this.selectedDetails.mw_values);
      this.travelator = JSON.parse(this.selectedDetails.travelator_values);

      // Combine all item names into one array
      this.itemNames = [...this.elevator, ...this.home, ...this.dumb, ...this.car_parking, ...this.escalator, ...this.moving_walk, ...this.travelator];

      // Initialize items array with the combined item names
      this.items = this.itemNames.map(name => ({ name, checked: false }));

      // Update totals
      this.updateTotals();
    });
  }

  printItems() {
    console.log('Checked Items:', this.checkedItems);
    console.log('Unchecked Items:', this.uncheckedItems);
    console.log('Checked Count:', this.checkedCount);
    console.log('Unchecked Count:', this.uncheckedCount);
  }
}
