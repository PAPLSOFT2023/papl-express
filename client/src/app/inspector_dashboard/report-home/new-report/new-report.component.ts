import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent {
  containerVisible: boolean = false;
  incompleteReports: any[] = [];
  navigate_flag: boolean = false;
  contract: string = '';
  doc: string = '';
  unit_array:string[]=[];
  inspector_name:string|null='';
  isLoading:boolean = true; // Control loading state

  // Define the type for checkbox states
  checkboxStates: { [key: string]: boolean } = {  };


  unit_array_checker:string[]=[]

  constructor(private apicallservice: ApicallService, private router: Router,private http:HttpClient,private cdr :ChangeDetectorRef) {
    this.inspector_name=sessionStorage.getItem('UserName') || "";

    this.apicallservice.getUnit_details(this.inspector_name).subscribe(
      (responses: any[]) => {
        responses.forEach((response) => {
          if (response && !response.ReportComplete) {
            try {
              const unitNos = JSON.parse(response.unit_no);
              const modifiedResponse = {
                ...response,
                parsedUnitNos: unitNos
              };
              this.incompleteReports.push(modifiedResponse);
              console.log("incomplete",this.incompleteReports)
            } catch (error) {
              console.error("Error parsing unit_no:", error);
            }
          }
        });
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually if necessary
        }, 1000);
      },
      (error: any) => {
        console.error('Error fetching unit details:', error);
        this.isLoading=false;
      }
    );
  }

  // handleCheckpoint(event: any, index: number,unit_name:string): void {
  //   // const unitKey = unit${unit};
  //   // this.checkboxStates[unitKey] = ;
  //   if(event.target.checked)
  //     {
  //       this.unit_array_checker.push(unit_name)
  //       console.log('checks array',this.unit_array_checker);
        

  //     }
  //   }
  // // }
  handleCheckpoint(event: any, index: number, unit_name: string): void {
    if (event.target.checked) {
      // Check if the number of selected units is greater than 4
      if (this.unit_array_checker.length >= 4) {
        // If more than 4 units are selected, uncheck the current checkbox
        event.target.checked = false;
        // Display an error message or notify the user that only 4 units can be selected
        alert("You can only select up to 4 units.");
      } else {
        // If less than 4 units are selected, add the current unit to the array
        this.unit_array_checker.push(unit_name);
        console.log('checks array', this.unit_array_checker);
      }
    } else {
      // If the checkbox is unchecked, remove the unit from the array
      const indexToRemove = this.unit_array_checker.indexOf(unit_name);
      if (indexToRemove !== -1) {
        this.unit_array_checker.splice(indexToRemove, 1);
      }
    }
  }
  

  get isAnyCheckboxChecked(): boolean {
    return Object.values(this.unit_array_checker).some(state => state);
  }

  cancel() {
    this.containerVisible = false;
  }

  replaceHyphenWithSlash(contractNumber: string): string {
    return contractNumber.replace('-', '/');
  }

  navigateToNavigateComponent() {
    // this.router.navigate(['/navigate-component']);
    // console.log("",this.unit_array_checker)
    console.log('document id is',this.doc);
    
    sessionStorage.setItem("unit_array1", JSON.stringify(this.unit_array_checker));
    // this.router.navigate(['/afterlogin/Report_unitSelection',this.contract,this.doc]);
    const requestData = {
      unitArray: this.unit_array_checker,
      contract: this.contract,
      doc: this.doc
  };
  

  this.http.post<any>(`${environment.serverUrl}addUnitDetails`, requestData)
        .subscribe(response => {
          console.log('Response from backend:', response);
          // Handle response if needed
          const reportId = response.reportId;
          this.router.navigate(['/afterlogin/Report_unitSelection', this.contract, this.doc,reportId]);
      }, error => {
          console.error('Error:', error);
          // Handle error if needed
      });
  }

  navigateToReportDetail(contractNumber: string, documentid_For_Url: string,unit_array:string[]) {

    this.isLoading = true;
    this.apicallservice.checkContract_Avai_INF(contractNumber).subscribe(
      (result: any) => {
        
        setTimeout(() => {
          this.isLoading = false;

          this.cdr.detectChanges();
        

        if (result && result.length > 0) {
          this.contract = contractNumber;
          this.doc = documentid_For_Url;
          this.unit_array=unit_array;
         
          this.containerVisible = !this.containerVisible;
        } else {
          alert(this.replaceHyphenWithSlash(contractNumber) + " Contract Number is not Available");
        }
      },1000);
    },
    (error: any) => {
      setTimeout(() => {
        this.isLoading = false;
        console.error('error when checking contract:',error);
        this.cdr.detectChanges();
      },1000);
    }
  );

      }
    
     
  toggleContainer() {
    this.containerVisible = !this.containerVisible;
  }
}