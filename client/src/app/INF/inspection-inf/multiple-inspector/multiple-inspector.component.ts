import { Component,Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApicallService } from 'src/app/apicall.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-multiple-inspector',
  templateUrl: './multiple-inspector.component.html',
  styleUrls: ['./multiple-inspector.component.scss']
})
export class MultipleInspectorComponent {
  minDate!: Date;
  maxDate!: Date;
  constructor(private dataService:ApicallService, private datePipe: DatePipe,@Inject(MAT_DIALOG_DATA) public data: { schedule_from: string; schedule_to: string }) {
    this.minDate = new Date(data.schedule_from);
    this.maxDate = new Date(data.schedule_to);

  }

  items: { name: string, checked: boolean, headChecked:boolean,fromDate:string|null,toDate:string|null,units:number|null }[] = [];
  items1:{name: string, checked: boolean,headChecked:boolean,fromDate:string|null,toDate:string|null,units:number|null}[]=[];
  checkedItems1: { name: string, headChecked: boolean, fromDate: string|null, toDate: string|null , i_approved:number,i_rejected:number,units:number|null}[] = [];

  checkedItems: string[] = []; // Array to store checked item names
  uncheckedItems: string[] = []; // Array to store unchecked item names

  checkedCount = 0;
  uncheckedCount = this.items.length;

 
  
  itemNames =this.dataService.inspector_names;

  updateTotals() {


    this.checkedCount = this.items.filter(item => item.checked).length;
    this.uncheckedCount = this.items.length - this.checkedCount;
    this.dataService.setCheckedCount(this.checkedCount);
    this.dataService.unCheckedCount=this.uncheckedCount;
    this.dataService.total_items=this.itemNames;
    this.checkedItems1 = this.items.filter(item => item.checked).map(item => ({ name: item.name, headChecked: item.headChecked, fromDate: item.fromDate, toDate: item.toDate, i_approved:0,i_rejected:0,units:item.units }));
    this.checkedItems = this.items .filter(item => item.checked) 
    .map(item => item.name); 

    this.dataService.inspector_array=this.checkedItems1;


    console.log('verify filtered array',this.checkedItems1);
    


    this.dataService.inspector_list = this.checkedItems;

    
    this.dataService.inspector_list=this.checkedItems;
    this.dataService.total_checked_items=this.checkedItems;
    this.uncheckedItems = this.items.filter(item => !item.checked).map(item => item.name);
    this.dataService.total_unchecked_items=this.uncheckedItems;
  }
 

  ngOnInit() {
 
   this.items = this.itemNames.map(name => ({ name, checked: false,headChecked:false,fromDate:null,toDate:null,units:null }));

  }
  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  printItems() {
    
    this.updateTotals();
    
    
    
    }

  
  // items: { name: string, checked: boolean }[] = [];
  // checkedItems: string[] = []; // Array to store checked item names
  // uncheckedItems: string[] = []; // Array to store unchecked item names

  // checkedCount = 0;
  // uncheckedCount = this.items.length;

 
 

  // itemNames =this.dataService.inspector_names;

  // updateTotals() {
   

  //   // Update the checkedItems and uncheckedItems arrays
  //   this.checkedItems = this.items.filter(item => item.checked).map(item => item.name);
  //   this.dataService.inspector_list=this.checkedItems;
   
  // }
  // constructor(private dataService:DataService) {


  // }

  // ngOnInit() {
 
  //  this.items = this.itemNames.map(name => ({name, checked: false}));

  //   this.updateTotals();
  //   this.printItems();
  // }

  // printItems() {
  //   console.log('Checked Items:', this.checkedItems);
  //   console.log('Unchecked Items:', this.uncheckedItems);
  //   console.log('checked count:',this.checkedCount);
  //   console.log('unchecked count:',this.uncheckedCount);
    
    
  // }
  areCheckedRowsValid(): boolean {
    return this.items.every(item => {
      if (item.checked) {
        return item.fromDate && item.toDate && item.units;
      }
      return true; // Ignore unchecked rows
    });
  }





  
}
