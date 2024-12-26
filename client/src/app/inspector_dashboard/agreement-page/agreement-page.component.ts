import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';

interface InspectorInfo {
  units: number;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-agreement-page',
  templateUrl: './agreement-page.component.html',
  styleUrls: ['./agreement-page.component.scss']
})
export class AgreementPageComponent {

  location1: string = 'assets/meeting.png';
  location: string = 'assets/voice1.png';
  showMessage: boolean = false;
  s_from: string | null = '';
  s_to: string | null = '';
  textRead: boolean = false;


  name:string='';
  check:boolean=true;
  val:string | null='';
  units:string[] | any=[];
  salesProcess:string='no';
  selfAssigned:string='no';
  // inf_26:string[]|any=[];
  inspectorArray: string[] = [];
  matchedInspector:boolean|any='';
  matchedInspector1:boolean|any='';
 
  inf_26:{id:number,contract_number:string,customer_workorder_name:string,customer_workorder_date:string,
    customer_name_as_per_work_order:string,type_of_inspection:string,job_type:string,project_name:string,
    building_name:string,location:string,type_of_building:string,site_address:string,customer_contact_name:string,
    ustomer_contact_number:string,customer_contact_number:string,customer_contact_mailid:string,oem_details:string,
    no_of_elevator:number,no_of_escalator:number,no_of_travelator:number,	no_of_mw:number, no_of_car_parking:number,
    travel_expenses_by:string,accomodation_by:string,no_of_stops_elevator:number,no_of_stops_dw:number,no_of_home_elevator:number,
    no_of_visits_as_per_work_order:number,no_of_mandays_as_per_work_order:number,	total_units_schedule:number,schedule_from:string,
    schedule_to:string,tpt6:number,	tpt7:number, load_test:number,pmt:number,rope_condition:number,callback:number,balance:number,inspector_list:string[],
    inspector_array:string,region:string}={id:0,contract_number:'',customer_workorder_name:'',customer_workorder_date:'',customer_name_as_per_work_order:'',type_of_inspection:'',job_type:'',project_name:'',building_name:'',location:'',type_of_building:'',site_address:'',customer_contact_name:'',ustomer_contact_number:'',customer_contact_number:'',customer_contact_mailid:'',oem_details:'',no_of_elevator:0,no_of_escalator:0,no_of_travelator:0,	no_of_mw:0,no_of_car_parking:0,travel_expenses_by:'',accomodation_by:'',no_of_stops_elevator:0,no_of_stops_dw:0,no_of_home_elevator:0,no_of_visits_as_per_work_order:0,no_of_mandays_as_per_work_order:0,	total_units_schedule:0,schedule_from:'',
    schedule_to:'',tpt6:0,	tpt7:0, load_test:0,pmt:0, rope_condition:0,callback:0,balance:0,inspector_list:[],inspector_array:'',region:''};

  constructor(private route: ActivatedRoute,private dataService: ApicallService,private http :HttpClient,private router:Router,private datePipe: DatePipe,private cd: ChangeDetectorRef){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      if (this.val) {
        sessionStorage.setItem('contract_no', this.val); 
      }
      
    });

  }
  ngOnInit(){
    this.name = sessionStorage.getItem('UserName') as string;
    //api call
    this.dataService.getDetailsForContractName(this.val).subscribe((details: any) => {
      console.log('inf api is called');
      
       this.inf_26 = details;
      //  console.log("*****",details.id)
      // this.selectedDetails=details;
      console.log('date',this.inf_26.schedule_from);
      
      console.log('agreement page inf',this.inf_26);
      console.log('inspector array is',details.inspector_array);
      const Ins_array = JSON.parse(details.inspector_array);
      const se_from = new Date(this.inf_26.schedule_from);
      const se_to = new Date(this.inf_26.schedule_to);
      const s_from = this.datePipe.transform(se_from, 'dd-MM-yyyy');
      const s_to = this.datePipe.transform(se_to, 'dd-MM-yyyy');
      // this.s_from = this.datePipe.transform(se_from1, 'dd-MM-yyyy');
      // this.s_to = this.datePipe.transform(se_to1, 'dd-MM-yyyy');
        });
    
  }

  parseInspectorArray(request: any): InspectorInfo {
    let inspectorInfo: InspectorInfo = {
      units: 0,
      fromDate: '',
      toDate: ''
    };
  
    const nameToFind = this.name; // Replace this with the name you want to find
  
    if (request && request.inspector_array) {
      const inspectorArray = JSON.parse(request.inspector_array);
  
      // Iterate through the inspector_array
      for (const inspector of inspectorArray) {
        if (inspector.name === nameToFind && inspector.units) {
          console.log('insp name array',inspector.name);
          
          inspectorInfo.units = inspector.units;
          inspectorInfo.fromDate = inspector.fromDate;
          inspectorInfo.toDate = inspector.toDate;
          break; // Break the loop once the desired inspector is found
        }
      }
    }
  
    return inspectorInfo;
  }
  
  getFromDate(request: any): string {
    const inspectorInfo = this.parseInspectorArray(request);
    return inspectorInfo.fromDate;
  }
  
  getToDate(request: any): string {
    const inspectorInfo = this.parseInspectorArray(request);
    return inspectorInfo.toDate;
  }

  getUnits(request:any) {
    const inspectorInfo = this.parseInspectorArray(request);
    return inspectorInfo.units;
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }
  public isSendMailEnabled(inspectorArrayString: string): boolean {
    try {
      const inspectorArray: any[] = JSON.parse(inspectorArrayString);
            // const inspectorArray: any[] =inspectorArrayString;

      
      console.log('Parsed inspectorArray:', typeof(inspectorArray));
      
      if (Array.isArray(inspectorArray) && inspectorArray.length>0) {
        const result = inspectorArray.every((inspector: any) => inspector.i_approved === 1);
        console.log('All i_approved values are 1:', result);
        
        // Check for name and headChecked condition
        const nameMatchesAndHeadChecked = inspectorArray.some((inspector: any) => {
          return inspector.name === this.name && inspector.headChecked === true;
        });
  
        console.log('Name matches and headChecked is true:', nameMatchesAndHeadChecked);
        
        return result && nameMatchesAndHeadChecked;
      } else {
        console.log('Array is not valid or empty');
        return false; // If inspectorArray is not an array or empty, disable the button
      }
    } catch (error) {
      console.error('Error processing inspectorArray:', error);
      return false; // Return false in case of any errors
    }
  }


  accept(){
    console.log('inspector name is',this.name);
    console.log('contract no is',this.val);
    console.log('agreement checked',this.check);
    console.log('inspector array from accept',this.inf_26.inspector_array);
    this.matchedInspector1 = this.isSendMailEnabled((this.inf_26.inspector_array));

    // const inspectorArray1:string[]| any[] = JSON.parse(this.inf_26.inspector_array);

    
    
    this.parseInspectorArray(this.inf_26);

    
    
    const store_values ={
      name:this.name,
      contract_no:this.val,
      check:this.check,
      selfAssigned:this.selfAssigned,
      salesProcess:this.salesProcess,
      head:this.matchedInspector1,
      no_of_units:this.getUnits(this.inf_26),
      from_date:this.getFromDate(this.inf_26),
      to_date:this.getToDate(this.inf_26),
      project_name:this.inf_26.project_name,
      location:this.inf_26.location,
      region:this.inf_26.region

    }
    this.http.post(`${environment.serverUrl}api/store_data_agreement`, store_values).subscribe(      (response) => {
        console.log('Data stored successfully', response);
   
    // this.router.navigate(['afterlogin', 'auth',response]);
    console.log('ans for matching records',this.matchedInspector);
    // const matchedInspector = this.isSendMailEnabled(this.inf_26.inspector_array);


    console.log("^^",typeof(this.inf_26.inspector_array))
    const matchedInspector = this.isSendMailEnabled((this.inf_26.inspector_array));
    // const matchedInspector = this.isSendMailEnabled(this.inf_26.inspector_array);

    console.log('mached inspector', matchedInspector);
    

     if (matchedInspector) {
        // Navigate to one URL if the condition is met
        this.router.navigate(['afterlogin', 'auth',response]);
      } else {
        // Navigate to another URL if the condition is not met
        this.router.navigate(['afterlogin', 'risk',response]);
      }
    
    

  
  
  },
      (error) => {
        console.error('Error storing data', error);
      }
    );
    

    
  }
  speakText(): void {
    const textToSpeak = `
      OPENING MEETING
      Greetings of the Day One and all present here!
      This inspection is categorized  as third-party Type 3 inspection - inspection for safety, performance & maintenance quality assessment, and it is a checklist-based assessment.
      During the course of the inspection, we will be collecting a lot of data about the elevator along with pictures as evidence of our findings. We assure you that the information gathered and pictures taken will be handled with confidentiality as we are bound by oath of secrecy. We are also bound by independence and impartiality requirements as an inspection body and if you find any issues with us or our conduct or inspection process you may write to info@paplcorp.com and your concerns will be addressed appropriately.
      This inspection will be conducted by Me/Us between ${this.formatDate(this.inf_26.schedule_from)} to ${this.formatDate(this.inf_26.schedule_to)}.
      Thank you!
      For inquiries, please contact us at info@paplcorp.com.
    `;
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.onend = () => {
      this.textRead = true;
      this.showMessage = false; // Set showMessage to false after the audio ends
      // Call change detection manually since onend event is outside Angular zone
      this.cd.detectChanges();
    };
    speechSynthesis.speak(utterance);
    this.showMessage=true;
  }
  

}