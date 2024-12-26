// import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { ApicallService } from 'src/app/apicall.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewofcertificate',
  templateUrl: './viewofcertificate.component.html',
  styleUrls: ['./viewofcertificate.component.scss']
})
export class ViewofcertificateComponent {
  nextId: number=0;
  signature: string ="";
  inf_26:{master_customer_name:string,id:number,contract_number:string,customer_workorder_name:string,customer_workorder_date:string,customer_name_as_per_work_order:string,type_of_inspection:string,job_type:string,project_name:string,building_name:string,location:string,type_of_building:string,site_address:string,customer_contact_name:string,ustomer_contact_number:string,customer_contact_number:string,customer_contact_mailid:string,oem_details:string,no_of_elevator:number,no_of_escalator:number,no_of_travelator:number,	no_of_mw:number, no_of_car_parking:number,travel_expenses_by:string,accomodation_by:string,no_of_stops_elevator:number,no_of_stops_dw:number,no_of_home_elevator:number,no_of_visits_as_per_work_order:number,no_of_mandays_as_per_work_order:number,	total_units_schedule:number,schedule_from:string,schedule_to:string,tpt6:number,	tpt7:number, load_test:number,pmt:number,rope_condition:number,callback:number,balance:number,inspector_list:string[]}={master_customer_name:'',id:0,contract_number:'',customer_workorder_name:'',customer_workorder_date:'',customer_name_as_per_work_order:'',type_of_inspection:'',job_type:'',project_name:'',building_name:'',location:'',type_of_building:'',site_address:'',customer_contact_name:'',ustomer_contact_number:'',customer_contact_number:'',customer_contact_mailid:'',oem_details:'',no_of_elevator:0,no_of_escalator:0,no_of_travelator:0,	no_of_mw:0,no_of_car_parking:0,travel_expenses_by:'',accomodation_by:'',no_of_stops_elevator:0,no_of_stops_dw:0,no_of_home_elevator:0,no_of_visits_as_per_work_order:0,no_of_mandays_as_per_work_order:0,	total_units_schedule:0,schedule_from:'',schedule_to:'',tpt6:0,	tpt7:0, load_test:0,pmt:0, rope_condition:0,callback:0,balance:0,inspector_list:[]};
  breif_spec:any[] =[];
  htmlContent: string='';
  currentDate: Date = new Date();
  // breif_spec:{oem:string}={oem:''};
  unit:string|null ='';
  document_id:string |null ='';
  contract:string|null='';
  id:string|null ='';
  constructor(private route: ActivatedRoute,private dataService:ApicallService, private http:HttpClient) { } 
  ngOnInit(){
    this.fetchSignature();
    this.getNextId();
    this.unit = this.route.snapshot.paramMap.get('unit');
    this.document_id = this.route.snapshot.paramMap.get('document_id');
    this.contract= this.route.snapshot.paramMap.get('contract');
    this.id= this.route.snapshot.paramMap.get('id');
    console.log('unit is ',this.unit);
    console.log('document id is ',this.document_id);
    console.log('contract_number is ',this.contract);
    this.dataService.getDetailsForContractName(this.contract).subscribe((details: any) => {
      
      this.inf_26 = details;
  
    })

    
    
    const inspector = `${environment.serverUrl}api/b_spec?encodedValue=${this.document_id}&encodedValue1=${this.unit}`;
        this.http.get<any[]>(inspector) // Replace with your server endpoint
      .subscribe(data => {
        this.breif_spec = data;
        console.log('breif spec is',this.breif_spec);
        
      });


  }
  @HostListener('document:keydown.control.p', ['$event'])
  onCtrlP(event: KeyboardEvent) {
    event.preventDefault(); // Prevent default print action
    this.generatePDF();
  }
  getNextId(): void {
    this.http.get<number>(`${environment.serverUrl}api/next-id`).subscribe(        (id: number) => {
            this.nextId = id;
        },
        (error) => {
            console.error('Error fetching next ID: ', error);
        }
    );
}

  generatePDF() {
    const htmlContent = document.documentElement.outerHTML;

    this.http.post<any>('/generate-pdf', { htmlContent }).subscribe(
      response => {
        console.log('PDF generated and stored successfully:', response);
        // Show confirmation to the user
      },
      error => {
        console.error('Error generating or storing PDF:', error);
      }
    );
  }
  fetchSignature() {
    const name = sessionStorage.getItem('UserName') as string;
    // console.log('inspector name',this.name);
    this.http.get(`${environment.serverUrl}signature/` + name, { responseType: 'blob' })      .subscribe((data: Blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.signature = event.target.result;
        };
        reader.readAsDataURL(data);
      }, error => {
        console.error('Error fetching signature:', error);
      });
  }

  

}
