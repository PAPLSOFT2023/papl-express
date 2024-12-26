import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient ,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';


import { ApicallService } from 'src/app/apicall.service';
import { UnitsDetailsComponent } from '../units-details/units-details.component';

@Component({
  selector: 'app-basic-date',
  templateUrl: './basic-date.component.html',
  styleUrls: ['./basic-date.component.scss']
})
export class BasicDateComponent {
  showContainer: boolean = false;
  selectedFile: File | null = null;
  name:string='';
  recordCount:number=0;
  isPlusClicked: boolean = false;

  isButtonEnabled: boolean = false;
  plusloc:string='assets/plus.png'
  selectContract:string|null='';

  selectedDetails:any[]=[];

  combinedNames:string[]=[];
  combinedStops:number[]=[];

  referenceCode: string  = '';

  ID_With_name:string="";

  inf_26:{pincode:string,difference_in_days:string,id:number,contract_number:string,customer_workorder_name:string,customer_workorder_date:string,customer_name_as_per_work_order:string,type_of_inspection:string,job_type:string,project_name:string,building_name:string,location:string,type_of_building:string,site_address:string,customer_contact_name:string,ustomer_contact_number:string,customer_contact_number:string,customer_contact_mailid:string,oem_details:string,no_of_elevator:number,no_of_escalator:number,no_of_travelator:number,	no_of_mw:number, no_of_car_parking:number,travel_expenses_by:string,accomodation_by:string,no_of_stops_elevator:number,no_of_stops_dw:number,no_of_home_elevator:number,no_of_visits_as_per_work_order:number,no_of_mandays_as_per_work_order:number,	total_units_schedule:number,schedule_from:string,schedule_to:string,tpt6:number,	tpt7:number, load_test:number,pmt:number,rope_condition:number,callback:number,balance:number,inspector_list:string[],inspection_time_ins:string}={pincode:'',difference_in_days:'',id:0,contract_number:'',customer_workorder_name:'',customer_workorder_date:'',customer_name_as_per_work_order:'',type_of_inspection:'',job_type:'',project_name:'',building_name:'',location:'',type_of_building:'',site_address:'',customer_contact_name:'',ustomer_contact_number:'',customer_contact_number:'',customer_contact_mailid:'',oem_details:'',no_of_elevator:0,no_of_escalator:0,no_of_travelator:0,	no_of_mw:0,no_of_car_parking:0,travel_expenses_by:'',accomodation_by:'',no_of_stops_elevator:0,no_of_stops_dw:0,no_of_home_elevator:0,no_of_visits_as_per_work_order:0,no_of_mandays_as_per_work_order:0,	total_units_schedule:0,schedule_from:'',schedule_to:'',tpt6:0,	tpt7:0, load_test:0,pmt:0, rope_condition:0,callback:0,balance:0,inspector_list:[],inspection_time_ins:''};
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





  // openDialog1(){
 
  //   const dialogRef = this.dialog.open(UnitsDetailsComponent,{restoreFocus:false});
  //   const dialogData = {
  //     val: this.recordCount, // Assuming this is the variable you want to pass
     
  //   };
  
  //   dialogRef.afterClosed().subscribe(()=>{
  //     // alert('this dialog has been closed.');
  //     console.log('repeatcount val',this.dataService.recordCount);
      
  //     });
  //   }
  openDialog1() {
    const dialogRef = this.dialog.open(UnitsDetailsComponent, {
      restoreFocus: false,
      data: {
        val: this.recordCount,
        location:this.inf_26.location,
        building_name:this.inf_26.building_name,
        pincode:this.inf_26.pincode
      },
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // console.log('repeatcount val', this.dataService.recordCount);
    });
    this.isPlusClicked = true;
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


 
  // private lastGeneratedNumber = 0;
  // private generateReferenceCode(): string {
  //   this.lastGeneratedNumber++; // Increment the last generated number
  //   const currentDate = new Date();
  //   const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd/');
  //   const paddedNumber = this.lastGeneratedNumber.toString().padStart(4, '0');
  //   return `PAPL/${formattedDate}${paddedNumber}`;
  // }

  ngOnInit(){
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('------', this.name);

    this.get_Insp_Name_List();

  
    
    

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
       const contract_no = this.inf_26.contract_number;
       console.log('====================================');
       console.log('difference in days',this.inf_26.difference_in_days);
       console.log('====================================');
       sessionStorage.setItem('contract_no',contract_no);
      //  console.log("*****",details.id)
      this.selectedDetails=details;
      console.log(this.inf_26);
      const params = new HttpParams().set('name', this.name).set('id',this.inf_26.id);

      this.http.get<number>(`${environment.serverUrl}api/countRecords_u`, { params })    
        .subscribe(
        count => {
           this.recordCount = count;
          console.log('Record count:', count);
        },
        error => {
          console.error('Error fetching record count:', error);
          // Additional logging for debugging purposes
          if (error instanceof HttpErrorResponse) {
            console.error('HTTP Status:', error.status);
            console.error('Error details:', error.error);
          }
        }
      );
      

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

  constructor(private dialog:MatDialog,public dataService:ApicallService,private apicallservice:ApicallService,private route:ActivatedRoute,private datePipe:DatePipe, private http: HttpClient,private router:Router){

    // this.referenceCode = this.generateReferenceCode();
    
  }
  showFloatingContainer() {
    this.showContainer = true;
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitFile() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    const document_id = sessionStorage.getItem('document_id');

    const formData = new FormData();
    formData.append('fileUpload', this.selectedFile);
    formData.append('document_id',document_id || '');

    // Update the API endpoint name to 'http://localhost:3000/uploadFile'

    const apiUrl = `${environment.serverUrl}uploadFile`;

    this.http.post<any>(apiUrl, formData).subscribe(
      (response) => {
        alert('Building image uploaded successfully..!')
        console.log('File uploaded successfully:', response);
        this.showContainer = false; // Hide the container after successful upload
        this.selectedFile = null; // Reset selected file
        
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  view() {
   
    console.log('unit values',this.dataService.unit_values);
    console.log('inspector name',this.name);
    console.log('contract number',this.inf_26.contract_number);
    const unit_values=this.dataService.unit_values;
    sessionStorage.setItem('unit_values', JSON.stringify(unit_values)); 
    const document_id = sessionStorage.getItem('document_id');


    const contract_number=this.inf_26.contract_number;
    const building_name = this.inf_26.building_name;

    const store_values={
      unit_values:unit_values,
      insp_name:this.name,
      contract_number:contract_number,
      document_id : document_id,
      building_name:building_name
    }

   
   

this.http.put(`${environment.serverUrl}api/store_data11`, store_values).subscribe(
        (response) => {
        console.log('Data stored successfully', response);
 
    this.router.navigate(['afterlogin', 'unit',document_id]);
  },
      (error) => {
        console.error('Error storing data', error);
      }
    );
  
    

    
    
     
  }


  
  start(){
    this.router.navigate(['afterlogin', 'unit_details',this.recordCount]);
  
  }
  get_Insp_Name_List() {
    this.apicallservice.get_Insp_Name_List().subscribe(
      (response: any[]) => {
        if (response) {
          console.log('@@@', response);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  closeContainer() {
    // Close the container logic here
    // For example, you can set showContainer to false
    this.showContainer = false;
}
  
  

}
