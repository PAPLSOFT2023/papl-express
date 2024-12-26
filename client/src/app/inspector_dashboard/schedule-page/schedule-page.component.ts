// import { Component } from '@angular/core';
// import { ApicallService } from 'src/app/apicall.service';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { ActivatedRoute,Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from 'src/app/INF/dialog/dialog.component';
// import { RejectionComponent } from '../rejection/rejection.component';
// import { ViewChild } from '@angular/core';
// import { environment } from 'src/environments/environment';
// interface InspectorInfo {
//   units: number;
//   fromDate: string;
//   toDate: string;
// }

// @Component({
//   selector: 'app-schedule-page',
//   templateUrl: './schedule-page.component.html',
//   styleUrls: ['./schedule-page.component.scss']
// })
// export class SchedulePageComponent {
//   name: string = '';
//   records:any[]=[];
//   scheduleBool:boolean=false;
//   salesProcess:string='';
//   selfAssigned:string='';
//   isAcceptButtonDisabled: boolean = false;
//   units: number | undefined; 


//   constructor(private apicallservice: ApicallService, private http: HttpClient,private router:Router, private dialog:MatDialog, private route: ActivatedRoute) {}
//   // parseInspectorArray(request: any): number {
//   //   let units = 0; // Initialize units to 0
//   //   const nameToFind = this.name; // Replace this with the name you want to find
  
//   //   if (request && request.inspector_array) {
//   //     const inspectorArray = JSON.parse(request.inspector_array);
  
//   //     // Iterate through the inspector_array
//   //     for (const inspector of inspectorArray) {
//   //       if (inspector.name === nameToFind && inspector.units) {
//   //         units = inspector.units; // Set units to the value from inspector.units
//   //         break; // Break the loop once the desired inspector is found
//   //       }
//   //     }
//   //   }
  
//   //   return units;
//   // }
//   parseInspectorArray(request: any): InspectorInfo {
//     let inspectorInfo: InspectorInfo = {
//       units: 0,
//       fromDate: '',
//       toDate: ''
//     };
  
//     const nameToFind = this.name; // Replace this with the name you want to find
  
//     if (request && request.inspector_array) {
//       const inspectorArray = JSON.parse(request.inspector_array);
  
//       // Iterate through the inspector_array
//       for (const inspector of inspectorArray) {
//         if (inspector.name === nameToFind && inspector.units) {
//           console.log('insp name array',inspector.name);
          
//           inspectorInfo.units = inspector.units;
//           inspectorInfo.fromDate = inspector.fromDate;
//           inspectorInfo.toDate = inspector.toDate;
//           break; // Break the loop once the desired inspector is found
//         }
//       }
//     }
  
//     return inspectorInfo;
//   }
  
//   getFromDate(request: any): string {
//     const inspectorInfo = this.parseInspectorArray(request);
//     return inspectorInfo.fromDate;
//   }
  
//   getToDate(request: any): string {
//     const inspectorInfo = this.parseInspectorArray(request);
//     return inspectorInfo.toDate;
//   }

//   getUnits(request:any) {
//     const inspectorInfo = this.parseInspectorArray(request);
//     return inspectorInfo.units;
//   }
  
 

//   ngOnInit() {
//     this.scheduleBool=false
//     this.name = sessionStorage.getItem('UserName') as string;
//     console.log('------', this.name);
//     this.getRecordCount(this.name);
//     this.get_Insp_Name_List();
//   }
//   openRejectDialog(request: any){
//     const dialogRef = this.dialog.open(RejectionComponent, {
//       width: '300px',
//       data: { request }, // Pass data to the dialog if needed
//     });

//     dialogRef.afterClosed().subscribe((result: string) => {
//       if (result) {
//         // Handle the rejected request with the reason selected (result)
//         console.log('Rejected with reason:', result);
//         this.router.navigate(['../inspectorHome'], { relativeTo: this.route });
//         // Call your rejectRequest() function passing the reason or handle accordingly
//       }
//     });
  
 
    
//     }




//   redirectSchedule(){
//     this.scheduleBool=true;
//     this.router.navigate(['/afterlogin/inspectorHome/schedule_page']);
   
//   }

//   getRecordCount(name: string) {
//     const params = new HttpParams().set('name', name);

//     this.http.get<any>(`${environment.serverUrl}api/countRecords1`, { params })      .subscribe(
//         count => {
//             this.records = count;
//         },
//         error => {
//           console.error('Error fetching record count:', error);
//         }
//       );
//   }
  
//   approveRequest(id: number) {
//     const params = new HttpParams().set('id', id.toString()).set('name',this.name.toString());
//     console.log(id);
  
//     this.http.put<any>(`${environment.serverUrl}api/approveRecords`, {}, { params }) // Include empty object as body    
//       .subscribe(
//         count => {
//           // this.records = count;
//           console.log('successful');
//           alert('Successful...!');
//           this.router.navigate(['../inspectorHome'], { relativeTo: this.route });
//         },
//         error => {
//           console.error('Error approving record:', error);
//         }
//       );
//   }
  
//   get_Insp_Name_List() {
//     this.apicallservice.get_Insp_Name_List().subscribe(
//       (response: any[]) => {
//         if (response) {
//           console.log('@@@', response);
//         }
//       },
//       (error: any) => {
//         console.log(error);
//       }
//     );
//   }

  

//   validateRadioButtons() {
//     return this.salesProcess === 'no' && this.selfAssigned === 'no';
// }







// }
















import { Component } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/INF/dialog/dialog.component';
import { RejectionComponent } from '../rejection/rejection.component';
import { ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
interface InspectorInfo {
  units: number;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent {
  name: string = '';
  records:any[]=[];
  scheduleBool:boolean=false;
  salesProcess:string='';
  selfAssigned:string='';
  isAcceptButtonDisabled: boolean = false;
  units: number | undefined; 


  constructor(private apicallservice: ApicallService, private http: HttpClient,private router:Router, private dialog:MatDialog, private route: ActivatedRoute) {}
  // parseInspectorArray(request: any): number {
  //   let units = 0; // Initialize units to 0
  //   const nameToFind = this.name; // Replace this with the name you want to find
  
  //   if (request && request.inspector_array) {
  //     const inspectorArray = JSON.parse(request.inspector_array);
  
  //     // Iterate through the inspector_array
  //     for (const inspector of inspectorArray) {
  //       if (inspector.name === nameToFind && inspector.units) {
  //         units = inspector.units; // Set units to the value from inspector.units
  //         break; // Break the loop once the desired inspector is found
  //       }
  //     }
  //   }
  
  //   return units;
  // }
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
  
 

  ngOnInit() {
    this.scheduleBool=false
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('------', this.name);
    this.getRecordCount(this.name);
    this.get_Insp_Name_List();
  }
  openRejectDialog(request: any){
    const dialogRef = this.dialog.open(RejectionComponent, {
      width: '300px',
      data: { request }, // Pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        // Handle the rejected request with the reason selected (result)
        console.log('Rejected with reason:', result);
        this.router.navigate(['../inspectorHome'], { relativeTo: this.route });
        // Call your rejectRequest() function passing the reason or handle accordingly
      }
    });
  
 
    
    }




  redirectSchedule(){
    this.scheduleBool=true;
    this.router.navigate(['/afterlogin/inspectorHome/schedule_page']);
   
  }

  getRecordCount(name: string) {
    const params = new HttpParams().set('name', name);

    this.http.get<any>(`${environment.serverUrl}api/countRecords1`, { params })      .subscribe(
        count => {
            this.records = count;
        },
        error => {
          console.error('Error fetching record count:', error);
        }
      );
  }
  
  approveRequest(id: number) {
    const params = new HttpParams().set('id', id.toString()).set('name',this.name.toString());
    console.log(id);
  
    this.http.put<any>(`${environment.serverUrl}api/approveRecords`, {}, { params }) // Include empty object as body    
      .subscribe(
        count => {
          // this.records = count;
          console.log('successful');
          alert('Successful...!');
          this.router.navigate(['../inspectorHome'], { relativeTo: this.route });
        },
        error => {
          console.error('Error approving record:', error);
        }
      );
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

  
  validateRadioButtons(request: any): boolean {
    // Enable button only if both salesProcess and selfAssigned are "no"
    return request.salesProcess === 'no' && request.selfAssigned === 'no';
  }
  






}

