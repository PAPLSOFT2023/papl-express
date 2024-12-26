import { Component , Inject} from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApicallService } from 'src/app/apicall.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-rejection',
  templateUrl: './rejection.component.html',
  styleUrls: ['./rejection.component.scss']
})
export class RejectionComponent {
  request: any;
  selectedReason: string=''; // Variable to hold the selected reason
  name:string='';


  constructor(private http:HttpClient,private apicallservice:ApicallService,public dialogRef: MatDialogRef<RejectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.request = data.request; 
      console.log('parameter value is',this.request);
      


  }

  // reject(){
  //   const params = new HttpParams().set('id', this.request.toString()).set('reason', this.selectedReason.toString()).set('name',this.name.toString()); // Convert id to string
  //   // console.log(id);
  //   console.log(this.name);
    

  
  //   this.http.put<any>(`${environment.serverUrl}api/approveRecords3`, {}, { params }) // Include empty object as body      
  //   .subscribe(
  //       count => {
  //         // this.records = count;
  //         console.log('successful');
  //         alert('Successful...!');
  //       },
  //       error => {
  //         console.error('Error approving record:', error);
  //       }
  //     );

  // }
  reject() {
    const params = new HttpParams()
      .set('id', this.request.id.toString()) // Convert id to string
      .set('reason', this.selectedReason.toString()) // Convert reason to string
      .set('name', this.name.toString()); // Convert name to string
  
    console.log('Rejecting record with parameters:', {
      id: this.request.id,
      reason: this.selectedReason,
      name: this.name,
    });
  
    this.http.put<any>(`${environment.serverUrl}api/approveRecords3`, {}, { params }) // Include empty object as body      
      .subscribe(
        () => {
          console.log('Record rejected successfully');
          alert('Record rejected successfully!');
        },
        error => {
          console.error('Error rejecting record:', error);
          alert('Failed to reject the record. Please try again.');
        }
      );
  }
  
  
  

 


  rejectionReasons: string[] = [];
  ngOnInit(){
    const inspection_time_ins = `${environment.serverUrl}api/rejection`;
        this.http.get<string[]>(inspection_time_ins).subscribe((data) => {
      this.rejectionReasons = data;
    });

    this.name = sessionStorage.getItem('UserName') as string;
    console.log('------', this.name);

    this.get_Insp_Name_List();

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
