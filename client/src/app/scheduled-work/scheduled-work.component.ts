import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
// import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { response } from 'express';
import * as fs from 'fs';

import { trigger, state, style, transition, animate } from '@angular/animations';

interface InspectorInfo {
  units: number;
  fromDate: string;
  toDate: string;
}



@Component({
  selector: 'app-scheduled-work',
  templateUrl: './scheduled-work.component.html',
  styleUrls: ['./scheduled-work.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)), // Adjust the duration as needed
    ])
  ]
})
export class ScheduledWorkComponent implements OnInit {
[x: string]: any;
  isLoading = true;
  name: string = '';
  recordCount: number = 0;
  records:any[]=[];
  scheduleBool:boolean=false;
  showSendMailPopup = false; // Track the state of the popup
  // Your other variables and methods
 
  Error:any
  open_popUp=false;
  isGetInfDataEnabled = false;
  isGetInspectorDataEnabled = false;
  isGetMailSetupEnabled = false;
  isSendingMailEnabled = false;
  isMailReportEnabled = false;
  request : any ;


  location:string='/assets/logo1.png'

  constructor(private cdr: ChangeDetectorRef,private apicallservice: ApicallService, private http: HttpClient,private router:Router,private route:ActivatedRoute) {}
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
  ngOnInit() {
    

   
    this.scheduleBool=false
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('------', this.name);
    this.getRecordCount(this.name);
    this.getRecordCount1(this.name);
    
  }




  redirectSchedule(){
    this.scheduleBool=true;
    this.router.navigate(['/afterlogin/inspectorHome/schedule_page']);
    // this.router.navigate( [{ outlets: { scheduleOutlet: ['inspectorHome', 'schedule_page'] } }],{ relativeTo: this.route.parent } );
    // this.router.navigate(['/afterlogin', { outlets: { scheduleOutlet: ['schedule_page'] } }]);

    // this.router.navigate([{ outlets: { scheduleOutlet: ['schedule_page'] } }]);
   
  }
  
  

 

 


  getRecordCount(name: string) {
    const params = new HttpParams().set('name', name);

    this.http.get<number>(`${environment.serverUrl}api/countRecords`, { params })      .subscribe(
        count => {
          this.recordCount = count;
        },
        error => {
          console.error('Error fetching record count:', error);
          
        }
      );
  }
  closeDialog(){
    this.open_popUp=!this.open_popUp;
  }

 
  
  
  

  Send_Mail_Client(id:string){

   

    this.open_popUp=!this.open_popUp;
    // console.log(id);
    // const sender=sessionStorage.getItem("Email") as string
    if(id){
      this.apicallservice.getinfdata_forMail(id).subscribe(
        (response: any) => {
        if (response && response.length !== 0) {

         this. isGetInfDataEnabled = true;
  

         
          console.log("INF====>",response,"\n")
         this.apicallservice.getInspectorData(response[0].inspector_list).subscribe((inspector_data:any)=>{
          if(inspector_data)
          {


          
               this.isGetInspectorDataEnabled = true;
  
            console.log("Inspector Data====>",inspector_data,"\n")
            const inspvalue = inspector_data.map((jsonObject: Record<string, any>) =>
            Object.entries(jsonObject).flat()
          );

          const getEmailFromData = (dataArray: any[]): string | undefined => {
            const emailIndex = dataArray.indexOf('email_id');
            if (emailIndex !== -1 && emailIndex < dataArray.length - 1) {
              return dataArray[emailIndex + 1];
            }
            return undefined;
          };
          
          const emailArray: string[] = [];
          
          for (const personData of inspvalue) {
            // Check if personData is an array before processing
            if (Array.isArray(personData)) {
              const email = getEmailFromData(personData);
              if (email) {
                emailArray.push(email);
              }
            }
          }
          
         

            this.apicallservice.getMail_Setup("papl").subscribe((sender_Details:any)=>{
              if(sender_Details)
              {
                
                console.log("sender Data====>",sender_Details,"\n")

               
               this.isGetMailSetupEnabled = true;

  
                    const inspector_Data = inspector_data.map((jsonObject: Record<string, any>) =>
                    Object.entries(jsonObject).flat()
                  );

                    console.log("88", inspector_Data);

                    this.isSendingMailEnabled=true;
                      
                   
                    
                    this.apicallservice.send_mail_to_client(
                      response[0].id,
                      response[0].master_customer_name,
                      response[0].total_units_schedule,
                      response[0].project_name,
                      response[0].location,
                      response[0].contract_number,
                      response[0].customer_workorder_name+","+response[0].customer_workorder_date,
                      response[0].schedule_from,
                      response[0].schedule_to,
                      response[0].no_of_mandays_as_per_work_order,
                      response[0].type_of_inspection,
                      response[0].inspection_time_ins,
                      response[0].customer_contact_mailid,
                      emailArray,
                      inspector_Data,
                      sender_Details[0].App_password,
                      sender_Details[0].Email,
                      response[0].inspector_list
                      ).subscribe((mailStatus: any) => {
                        if (mailStatus && mailStatus.success) {
                          console.log("Email sent successfully:", mailStatus.success,response[0].id);
                          this.isMailReportEnabled = true;


                          setTimeout(() => {
                            this.open_popUp=!this.open_popUp;
                          }, 500);
                          
                        } else {
                          console.log("Failed to send email:", mailStatus.error);
                          // Handle the failure case as needed
                          this.Error=mailStatus.error;
                        }
                      },
                      (error: any) => {
                        console.error("API call failed:", error);
                        // Handle the error case as needed
                        this.Error=error;
                      }
                    );
                  }
            },(error:any)=>{
              this.Error=error;

            })
          }

         },(error:any)=>{
          this.Error=error;

         })
        }
        else{
          this.Error="Some PDF document are faild to load"
        }

       },
       (error:any)=>{
       this.Error=error

       }
      );
    }
    else{
      alert("error ")
    }
    
    

  }
 


  // public isSendMailEnabled(inspectorArrayString: string): boolean {
  //   try {
  //     const inspectorArray: any[] = JSON.parse(inspectorArrayString);
  
  //     console.log('Parsed inspectorArray:', inspectorArray);
  
  //     if (Array.isArray(inspectorArray) && inspectorArray.length > 0) {
  //       const result = inspectorArray.every((inspector: any) => inspector.i_approved === 1);
  //       console.log('All i_approved values are 1:', result);
  //       return result; // Return true if all i_approved values are 1
  //     } else {
  //       console.log('Array is not valid or empty');
  //       return false; // If inspectorArray is not an array or empty, disable the button
  //     }
  //   } catch (error) {
  //     console.error('Error processing inspectorArray:', error);
  //     return false; // Return false in case of any errors
  //   }
  // }
  // public isSendMailEnabled(inspectorArrayString: string): boolean {
  //   try {
  //     const inspectorArray: any[] = JSON.parse(inspectorArrayString);
      
  //     console.log('Parsed inspectorArray:', inspectorArray);
      
  //     if (Array.isArray(inspectorArray) && inspectorArray.length > 0) {
  //       const result = inspectorArray.every((inspector: any) => inspector.i_approved === 1);
  //       console.log('All i_approved values are 1:', result);
        
  //       // Check for name and headChecked condition
  //       const nameMatchesAndHeadChecked = inspectorArray.some((inspector: any) => {
  //         return inspector.name === this.name && inspector.headChecked === true;
  //       });
  
  //       console.log('Name matches and headChecked is true:', nameMatchesAndHeadChecked);
        
  //       return result && nameMatchesAndHeadChecked;
  //     } else {
  //       console.log('Array is not valid or empty');
  //       return false; // If inspectorArray is not an array or empty, disable the button
  //     }
  //   } catch (error) {
  //     console.error('Error processing inspectorArray:', error);
  //     return false; // Return false in case of any errors
  //   }
  // }
  
  
  
  
  // Example usage:
  // const inspectorArrayString = '[{"name":"N.KRISHNAN - 13001","headChecked":false,"fromDate":"2023-12-21T09:54:13.472Z","toDate":"2023-12-21T09:54:13.472Z","i_approved":0,"i_rejected":0},{"name":"S. SASIKUMAR - 13002","headChecked":true,"fromDate":"2023-12-21T09:54:13.472Z","toDate":"2023-12-21T09:54:13.472Z","i_approved":1,"i_rejected":0},{"name":"A ABDUL KAFAAR - 13005","headChecked":false,"fromDate":"2023-12-21T09:54:13.472Z","toDate":"2023-12-21T09:54:13.472Z","i_approved":1,"i_rejected":0}]';
  
  
  
  
  
 
  
  currentDate: Date = new Date();

  isSendMailEnabled(scheduleFrom: string,client_approval_status:string): boolean {
    // Convert the string to a Date object
    const scheduleDate = new Date(scheduleFrom);

    console.log('Current Date:', this.currentDate);
    console.log('Schedule From Date:', scheduleDate);

    // Check if the scheduleFrom date is after the current date
    // const isEnabled = (scheduleDate <= this.currentDate) && (client_approval_status===1);
    const isEnabled = (scheduleDate <= this.currentDate) && (client_approval_status === "1");


    console.log('Mail Sending Enabled:', isEnabled);
    return isEnabled;
  }

  isButtonDisabled(scheduleFrom: string,client_approval_status:string): boolean {
    return !this.isSendMailEnabled(scheduleFrom,client_approval_status);
  }

 




  getRecordCount1(name: string) {
    const params = new HttpParams().set('name', name);

    this.http.get<any>(`${environment.serverUrl}api/countRecords22`, { params })      .subscribe(
        count => {
            this.records = count;
            setTimeout(() => {
              this.isLoading = false;
              this.cdr.detectChanges(); // Trigger change detection manually if needed
            }, 1000);
            
        },
        error => {
          console.error('Error fetching record count:', error);
        }
      );
  }

  pdf(no:string){
    
    // const successMessage = 'Click ok to view the document';
    // const userConfirmation = window.confirm(successMessage);
    // if(userConfirmation){
    //   console.log("Called..*******",no)
      this.router.navigate(['pdf',no]);
    // }
    // this.router.navigate(['pdf',no]);


  }
  // start(no:string){
  //   this.router.navigate(['../basic_data',no], { relativeTo: this.route });
  
  
  // }
  start(no:string){
    this.router.navigate(['../agreement',no], { relativeTo: this.route });
  }

 
}






