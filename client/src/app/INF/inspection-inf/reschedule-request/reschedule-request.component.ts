import { Component,OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reschedule-request',
  templateUrl: './reschedule-request.component.html',
  styleUrls: ['./reschedule-request.component.scss']
})
export class RescheduleRequestComponent {
  name: string = '';
  recordCount: number = 0;
  records:any[]=[];
  scheduleBool:boolean=false;

  location:string='/assets/logo1.png'

  constructor(private apicallservice: ApicallService, private http: HttpClient,private router:Router, private httpClient:HttpClient) {}

  ngOnInit() {
    

   
    this.scheduleBool=false
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('------', this.name);
    this.getRecordCount(this.name);
    this.getRecordCount1(this.name);
    this.get_Insp_Name_List();
  }

  handleClick(c_no: string) {
    // Handle the click event here
    // const encodedValue = encodeURIComponent(c_no);
    // this.router.navigate(['afterlogin/inspection_inf', encodedValue]);
    const encodedValue = encodeURIComponent(c_no);
    this.router.navigate(['afterlogin/reschedule_update', encodedValue]);

    
    
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
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

    this.http.get<number>(`${environment.serverUrl}api/countRecords`, { params })
          .subscribe(
        count => {
          this.recordCount = count;
        },
        error => {
          console.error('Error fetching record count:', error);
        }
      );
  }

  getRecordCount1(name: string) {
    const params = new HttpParams().set('name', name);

    this.http.get<any>(`${environment.serverUrl}api/countRecords3`, { params })
          .subscribe(
        count => {
            this.records = count;
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

}
