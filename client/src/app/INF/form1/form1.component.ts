import { Component,OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Dialog2Component } from '../dialog2/dialog2.component';
import { HttpClient } from '@angular/common/http';
// import { DataService } from '../data.service';
import { ApicallService } from 'src/app/apicall.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component {
 
 
  


  store_url='';
  values: string[] = [];
  region_values:string[]=[];
  inspection_type:string[]=[];
  oem:string[]=[];
  travel:string[]=[];
  inspector:string[]=[];
  inspection_time:string[]=[];
  inspection_time_ins:string[]=[];


  //checkbox values
  tpt6:boolean=false;
  tpt7:boolean=false;
  load_test:boolean=false;
  pmt:boolean=false;
  rope_condition:boolean=false;

  //flag for check boxes
  tpt6_flag=0;
  tpt7_flag=0;
  load_test_flag=0;
  pmt_flag=0;
  rope_condition_flag=0;
  
  //functions for asign the checkbox values into flag values

  updatetpt6Flag() {
    this.tpt6_flag = this.tpt6 ? 1 : 0;
  }

  updatetpt7Flag() {
    this.tpt7_flag = this.tpt7 ? 1 : 0;
  }

  updateload_testFlag() {
    this.load_test_flag = this.load_test ? 1 : 0;
  }

  updatepmtFlag() {
    this.pmt_flag = this.pmt ? 1 : 0;
  }

  updaterope_conditionFlag() {
    this.rope_condition_flag= this.rope_condition ? 1 : 0;
  }

  check(){
    console.log('tpt6 flag',this.tpt6_flag);
    console.log('tpt7 flag',this.tpt7_flag);
    console.log('load test flag',this.load_test_flag);
    console.log('pmt flag',this.pmt_flag);
    console.log('rope condition flag',this.rope_condition_flag);
    
    
  }
  //all the values

  contract_number:string='';
  region:string='';
  location:string='';
  pincode:string='';
  master_customer:string='';
  work_order_no:string='';
  customer_name_workorder:string='';
  project_name:string='';
  building_name:string='';
  building_type:string='';
  inspection_type_sync:string='';
  site_address:string='';
  customer_contact_name:string='';
  customer_contact_number:string='';
  customer_contact_mailid:string='';
  //
  oem_details_sync:string='';
  total_number_of_units:number=0;
  travel_expenses_by:string='';
  accomodation_by:string='';
  no_of_visits_as_per_work_order:number=0;
  no_of_mandays_as_per_work_order:number=0;
  inspection_time_sync:string='';
  inspector_name:string='';
  client_whatsapp_number:string='';
  inspection_time_ins_sync:string='';
  scheduleFrom:Date= new Date();
  scheduleTo:Date = new Date();
  work_order_date= new Date();

  //checked items
  // from_date: Date=
 

  








  constructor(private http:HttpClient,private dialog:MatDialog,private dataService:ApicallService){
    
  }
  ngOnInit(): void {

    const apiUrl = `${environment.serverUrl}api/building_type`;
    const apiUrl_for_region = `${environment.serverUrl}api/region`;
    const inspection_type = `${environment.serverUrl}api/inspection_type`;
    const oem = `${environment.serverUrl}api/oem`;
    const travel = `${environment.serverUrl}api/travel`;
    const inspector= `${environment.serverUrl}api/inspector`;
    const inspection_time = `${environment.serverUrl}api/inspection_time`;
    const inspection_time_ins = `${environment.serverUrl}api/inspection_time_ins`;


    
    this.http.get<string[]>(apiUrl).subscribe((data) => {
      this.values = data;
    });

    this.http.get<string[]>(apiUrl_for_region).subscribe((data) => {
      this.region_values = data;
      console.log(data);
      
    });

    this.http.get<string[]>(inspection_type).subscribe((data) => {
      this.inspection_type = data;
      console.log(data);
      
    });
    this.http.get<string[]>(oem).subscribe((data) => {
      this.oem = data;
      console.log(data);
      
    });

    this.http.get<string[]>(travel).subscribe((data) => {
      this.travel = data;
      console.log(data);
      
    });
    this.http.get<string[]>(inspector).subscribe((data) => {
      this.inspector = data;
      console.log(data);
      
    });

    this.http.get<string[]>(inspection_time).subscribe((data) => {
      this.inspection_time = data;
      console.log(data);
      
    });

    this.http.get<string[]>(inspection_time_ins).subscribe((data) => {
      this.inspection_time_ins = data;
      console.log(data);
      
    });
  
  
  }
  // openDialog(){
  //   const dialogRef = this.dialog.open(DialogComponent,{restoreFocus:false});
  //   dialogRef.afterClosed().subscribe(()=>{
  //     const dialog2 = this.dialog.open(Dialog2Component,{restoreFocus:false});
  //     dialog2.afterClosed().subscribe(()=>{
  //       alert('this dialog has been closed.');
  //     });
  //   });
  // }
  openDialog(){
    const dialogRef = this.dialog.open(Dialog2Component,{restoreFocus:false});
    dialogRef.afterClosed().subscribe(()=>{
      // alert('this dialog has been closed.');
    });
  }

openDialog1(){
  const dialogRef = this.dialog.open(DialogComponent,{restoreFocus:false});
  dialogRef.afterClosed().subscribe(()=>{
    // alert('this dialog has been closed.');
    });
  }
  title = 'inf_26_doc';
  // onSubmit() {
  //   const store_values={contract_number:this.contract_number,region:this.region,location:this.location};

  //   this.http.post('http://localhost:3000/api/store_data', this.store_values).subscribe(
  //     (response) => {
  //       console.log('details stored successfully');
  //       // Handle success (e.g., redirect to a login page)
  //     },
  //     (error) => {
  //       console.error('Error stored details: ' + error);
  //       // Handle error (e.g., display an error message)
  //     }
  //   );
  // }
  check1(){
    console.log(this.scheduleFrom);
    console.log(this.tpt6_flag);
    console.log(this.tpt7_flag);
    console.log(this.rope_condition_flag);
    console.log(this.pmt_flag);
    console.log(this.load_test_flag);
    console.log(this.client_whatsapp_number);
    
    
    
    
    
    
    
  //   elevator_names:string[]=[]; //1
  // elevator_usage:string[]=[];
  // elevator_type:string[]=[];
  // elevator_stops:number[]=[];
  // home_names:string[]=[]; //2
  // home_usage:string[]=[];
  // home_type:string[]=[];
  // home_stops:number[]=[];
  // dump_names:string[]=[]; //3
  // dump_usage:string[]=[];
  // dump_type:string[]=[];
  // dump_stops:number[]=[];

  // total_count:number=0;
  // hydra_elevator:number=0;
  // dumb_waiter:number=0;
  // car_parking:number=0;
  // escalator:number=0;
  // moving_walk:number=0;
  // travelator:number=0;

    
  }

  onSubmit() {
    //elevators
    const elevator_names=this.dataService.elevator_names;
    const elevator_type=this.dataService.elevator_type;
    const elevator_stops = this.dataService.elevator_stops;
    const elevator_usage=this.dataService.elevator_usage;
    const elevator={elevator_names,elevator_type,elevator_stops,elevator_usage};

    //home elevator
    const home_names = this.dataService.home_names;
    const home_stops = this.dataService.home_stops;
    const home_type = this.dataService.home_type;
    const home_usage = this.dataService.home_usage;
    const home_elevator = {home_names,home_stops,home_type,home_usage};

    //dumb waiter
      const dump_names=this.dataService.dump_names;
      const dump_stops = this.dataService.dump_stops;
      const dump_type = this.dataService.dump_type;
      const dump_usage = this.dataService.dump_usage;
      const dump_elevator={dump_names,dump_stops,dump_type,dump_usage};
    
    const checkedCount=this.dataService.getCheckedCount();
    const checked_items_values=this.dataService.total_checked_items;
    const uncheckedCount=this.dataService.unCheckedCount;
    const uncheckedItems = this.dataService.total_unchecked_items;
    const total_items=this.dataService.total_items;
    const no_of_elevator=this.dataService.total_count;
    const no_of_stops_elevator = this.dataService.calculateSum();
    const no_of_travelator = this.dataService.travelator;
    const no_of_mw= this.dataService.moving_walk;
    const no_of_dw = this.dataService.dumb_waiter;
    const no_of_stops_dw = this.dataService.calculateSum2();
    const no_of_home_elevator = this.dataService.hydra_elevator;
    const no_of_stops_home_elevator = this.dataService.calculateSum1();

    const no_of_car_parking = this.dataService.car_parking;

    const no_of_escalator = this.dataService.escalator;
    console.log('items',checked_items_values);
    
    console.log('value from service',checkedCount);
    
    
    const store_values = {
      contractNumber: this.contract_number,
      region: this.region,
      location:this.location,
      checked_count:checkedCount,
      checked_items:checked_items_values,
      unchecked_count:uncheckedCount,
      unchecked_items:uncheckedItems,
      total_items:total_items,
      elevator_values:elevator,
      home:home_elevator,
      dump:dump_elevator,
      pincode:this.pincode,
      master_customer:this.master_customer,
      work_order_no:this.work_order_no,
      customer_name_workorder:this.customer_name_workorder,
      project_name:this.project_name,
      building_name:this.building_name,
      building_type:this.building_type,
      inspection_type_sync:this.inspection_type_sync,
      site_address:this.site_address,
      customer_contact_name:this.customer_contact_name,
      customer_contact_number:this.customer_contact_number,
      customer_contact_mailid:this.customer_contact_mailid,
      oem_details:this.oem_details_sync,
      total_number_of_units:this.total_number_of_units,
      no_of_elevator:no_of_elevator,
      no_of_stops_elevator:no_of_stops_elevator,
      no_of_escalator:no_of_escalator,
      no_of_travelator:no_of_travelator,
      no_of_mw:no_of_mw,
      no_of_dw:no_of_dw,
      no_of_stops_dw:no_of_stops_dw,
      no_of_home_elevator:no_of_home_elevator,
      no_of_stops_home_elevator:no_of_stops_home_elevator,
      no_of_car_parking:no_of_car_parking,
      travel_expenses_by:this.travel_expenses_by,
      accomodation_by:this.accomodation_by,
      no_of_visits_as_per_work_order:this.no_of_visits_as_per_work_order,
      no_of_mandays_as_per_work_order:this.no_of_mandays_as_per_work_order,
      total_units_schedule:checkedCount,
      balance_to_inspect:uncheckedCount,
      inspection_time:this.inspection_time_sync,
      inspector_name:this.inspector_name,
      tpt6:this.tpt6_flag,
      tpt7:this.tpt6_flag,
      load_test:this.load_test_flag,
      pmt:this.pmt_flag,
      rope_condition:this.rope_condition_flag,
      client_whatsapp_number:this.client_whatsapp_number,
      inspection_time_ins:this.inspection_time_ins_sync,
      schedule_from : this.scheduleFrom,
      schedule_to : this.scheduleTo,
      customer_workorder_date:this.work_order_date,





      
      

      
    };

    this.http.post(`${environment.serverUrl}api/store_data`, store_values).subscribe(
            (response) => {
        console.log('Data stored successfully', response);
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );
  }

}
