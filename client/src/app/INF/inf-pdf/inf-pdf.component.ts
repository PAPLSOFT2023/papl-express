import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-inf-pdf',
  templateUrl: './inf-pdf.component.html',
  styleUrls: ['./inf-pdf.component.scss']
})
export class InfPdfComponent {
  selectContract:string|null='';

  selectedDetails:any[]=[];

  combinedNames:string[]=[];
  combinedStops:number[]=[];

  referenceCode: string  = '';

  ID_With_name:string="";

  inf_26:{id:number,contract_number:string,customer_workorder_name:string,customer_workorder_date:string,customer_name_as_per_work_order:string,type_of_inspection:string,job_type:string,project_name:string,building_name:string,location:string,type_of_building:string,site_address:string,customer_contact_name:string,ustomer_contact_number:string,customer_contact_number:string,customer_contact_mailid:string,oem_details:string,no_of_elevator:number,no_of_escalator:number,no_of_travelator:number,	no_of_mw:number, no_of_car_parking:number,travel_expenses_by:string,accomodation_by:string,no_of_stops_elevator:number,no_of_stops_dw:number,no_of_home_elevator:number,no_of_visits_as_per_work_order:number,no_of_mandays_as_per_work_order:number,	total_units_schedule:number,schedule_from:string,schedule_to:string,tpt6:number,	tpt7:number, load_test:number,pmt:number,rope_condition:number,callback:number,balance:number,inspector_list:string[]}={id:0,contract_number:'',customer_workorder_name:'',customer_workorder_date:'',customer_name_as_per_work_order:'',type_of_inspection:'',job_type:'',project_name:'',building_name:'',location:'',type_of_building:'',site_address:'',customer_contact_name:'',ustomer_contact_number:'',customer_contact_number:'',customer_contact_mailid:'',oem_details:'',no_of_elevator:0,no_of_escalator:0,no_of_travelator:0,	no_of_mw:0,no_of_car_parking:0,travel_expenses_by:'',accomodation_by:'',no_of_stops_elevator:0,no_of_stops_dw:0,no_of_home_elevator:0,no_of_visits_as_per_work_order:0,no_of_mandays_as_per_work_order:0,	total_units_schedule:0,schedule_from:'',schedule_to:'',tpt6:0,	tpt7:0, load_test:0,pmt:0, rope_condition:0,callback:0,balance:0,inspector_list:[]};
  tpt6_val:string='';
  tpt7_val:string='';
  load_test:string='';
  pmt:string='';
  rope_condition:string='';
  callback:string='';
  balance:string='';
  concatenatedInspectors: string='';
  elevator_json:any;
  home_json:any;
  dumb_json:any;




  constructor(private dataService:ApicallService,private route:ActivatedRoute,private datePipe:DatePipe,private http:HttpClient){

    // this.referenceCode = this.generateReferenceCode();
  }


get_UNITNAME_STOPS(){


//  this.elevator_json =JSON.parse(this.dataService.selectedDetails.elevator_values);
//  this.home_json =JSON.parse(this.dataService.selectedDetails.home_elevator_values);
//  this.dumb_json =JSON.parse(this.dataService.selectedDetails.dump_values);

// let elevatorNames: string[] = this.elevator_json.elevator_names;
// let homeNames: string[] = this.home_json.home_names;
// let dumbNames: string[] = this.dumb_json.dump_names;

// // Concatenate the arrays
//  this.combinedNames = elevatorNames.concat(homeNames, dumbNames);

// // Assuming elevatorStops, homeStops, dumbStops are already defined
// let elevatorStops: number[] = this.elevator_json.elevator_stops;
// let homeStops: number[] = this.home_json.home_stops;
// let dumbStops: number[] = this.dumb_json.dump_stops;

// // Concatenate the stops arrays
// this.combinedStops = elevatorStops.concat(homeStops, dumbStops);

if (this.dataService.selectedDetails && 
  this.dataService.selectedDetails.elevator_values && 
  this.dataService.selectedDetails.home_elevator_values && 
  this.dataService.selectedDetails.dump_values) {

try {
  this.elevator_json = JSON.parse(this.dataService.selectedDetails.elevator_values);
  this.home_json = JSON.parse(this.dataService.selectedDetails.home_elevator_values);
  this.dumb_json = JSON.parse(this.dataService.selectedDetails.dump_values);

  // Rest of your code to handle the parsed JSON data
  // ...

  let elevatorNames: string[] = this.elevator_json.elevator_names;
let homeNames: string[] = this.home_json.home_names;
let dumbNames: string[] = this.dumb_json.dump_names;

// Concatenate the arrays
 this.combinedNames = elevatorNames.concat(homeNames, dumbNames);

// Assuming elevatorStops, homeStops, dumbStops are already defined
let elevatorStops: number[] = this.elevator_json.elevator_stops;
let homeStops: number[] = this.home_json.home_stops;
let dumbStops: number[] = this.dumb_json.dump_stops;

// Concatenate the stops arrays
this.combinedStops = elevatorStops.concat(homeStops, dumbStops);
} catch (error) {
  console.error('Error parsing JSON:', error);
}

} else {
console.error('Some values are undefined or missing in selectedDetails');
}

}
  

  
  
  currentDate = new Date();

  formattedDate:string|null='';
  s_from:string|null='';
  s_to:string|null='';
  differenceInDays:number=0;


 
  //private lastGeneratedNumber = 0;
  // private generateReferenceCode(): string {
  //   this.lastGeneratedNumber++; // Increment the last generated number
  //   const currentDate = new Date();
  //   const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd/');
  //    const paddedNumber = this.lastGeneratedNumber.toString().padStart(4, '0');
  //    return `PAPL/${formattedDate}${paddedNumber}`;
  // }

  ngOnInit(){
    
    

    this.get_UNITNAME_STOPS();
    this.route.paramMap.subscribe(params => {
      const encodedValue =  params.get('c_no');



     

     // this.selectContract=decodeURIComponent(decodedValue);
     if (encodedValue !== null) {
       this.selectContract = encodedValue;
     }

     
     


     //api call
     this.dataService.getDetailsForContractName(this.selectContract).subscribe((details: any) => {
      console.log('inf api is called');
      
       this.inf_26 = details;
      //  console.log("*****",details.id)
      this.selectedDetails=details;
      console.log(this.inf_26);
      

      // this.concatenatedInspectors=this.inf_26.inspector_list.join(', ');
      //  const dateObj = new Date(this.selectedDetails.customer_workorder_date);


      

      const datePipe = new DatePipe('en-US');
      const dateObj = new Date(this.inf_26.customer_workorder_date);
      const se_from = new Date(this.inf_26.schedule_from);
      const se_to = new Date(this.inf_26.schedule_to);


      const se_from1= datePipe.transform(se_from, 'yyyy-MM-dd')
const se_to1 = datePipe.transform(se_to,'yyyy-MM-dd')
      const differenceInMilliseconds = Math.abs(se_from.getTime() - se_to.getTime());
      if(this.inf_26.tpt6===1){
        this.tpt6_val="Tpt6";
      }

      if(this.inf_26.tpt7){
        this.tpt7_val="Tpt7";
      }

      if(this.inf_26.load_test){
        this.load_test="LoadTest"
      }

      if(this.inf_26.pmt){
        this.pmt="Pmt"
      }

      if(this.inf_26.rope_condition){
        this.rope_condition="RopeCondition"
      }

      if(this.inf_26.callback){
        this.callback="CallbackAnalysis"
      }

      if(this.inf_26.balance){
        this.balance="BalanceLifeAssessment"
      }




        // Convert milliseconds to days
      this.differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

      const updateData = {
        contractNumber: this.selectContract,
        differenceInDays: this.differenceInDays+1
      };
      console.log('contract ',this.selectContract);
      console.log('days difference',this.differenceInDays);
      
      
  
      // Send HTTP POST request to update difference_in_days
      this.http.post<any>(`${environment.serverUrl}api/update-inf-26`, updateData)
              .subscribe(
          (response) => {
            console.log('Update successful', response);
            // Optionally, perform any additional actions upon successful update
          },
          (error) => {
            console.error('Update failed', error);
            // Handle error
          }
        );
       


      //  // Get the date portion in the "YYYY-MM-DD" format
       const originalDate = dateObj.toISOString().split('T')[0];
      //  const original_s_from = se_from.toISOString().split('T')[0];
      //  const original_s_to = se_to.toISOString().split('T')[0];


       this.formattedDate = this.datePipe.transform(originalDate, 'dd-MM-yyyy');
       this.s_from = this.datePipe.transform(se_from1, 'dd-MM-yyyy');
       this.s_to=this.datePipe.transform(se_to1, 'dd-MM-yyyy');

       this.dataService.selectedDetails=this.selectedDetails;
       console.log(this.selectedDetails);

      // Assuming this.inf_26.inspector_list is a string received from the API
      if (typeof this.inf_26.inspector_list === 'string') {
        // Use type assertion for the string methods
        const items = (this.inf_26.inspector_list as string).replace(/\[|\]|"/g, '').split(',');
      
        // Filter out empty strings and extra spaces
        const dataArray = items.map((item: string) => item.trim()).filter((item: string) => item !== '');
        
      
        // Join the filtered array elements with a comma and a space
        this.concatenatedInspectors = dataArray.join(', ');
        const name=sessionStorage.getItem("UserName");

        if(name !==null){
        this.ID_With_name=this.inf_26.id +"_"+ name
        }
        else{
          this.ID_With_name=this.inf_26.id +"";
        }

      } else {
        this.concatenatedInspectors = ''; // Set it to an empty string or default value
      }
        console.log('concat array',this.concatenatedInspectors);

     });

    
 
   });
   console.log("concat "+this.concatenatedInspectors);
   


    

  }

  view() {
     
  }
  

}
