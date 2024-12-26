import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  baseUrl = `${environment.serverUrl}`;
  records:any[]=[];
  isLoading:boolean = false;
  
  hasFunctionalPointYChecked1:boolean=true;

  location:string='assets/switch.png'

  val:string | null='';
  units:string[] | any=[];
  constructor(private route: ActivatedRoute,private apicallservice: ApicallService,private http :HttpClient,private router:Router){
    this.route.paramMap.subscribe(params => {
     this.val = params.get('c_no');
     console.log(this.val);
     if (this.val) {
       sessionStorage.setItem('unit_no', this.val); 
     }
     
    













   });

   async function openOrCreateDatabase(dbName: string, version: number): Promise<void> {
     const openRequest: IDBOpenDBRequest = indexedDB.open(dbName, version);
   
     openRequest.onerror = (event) => {
       console.error("Failed to open database:", (event.target as IDBOpenDBRequest).error);
     };
   
     openRequest.onsuccess = async (event) => {
       console.log("Database opened successfully.");
   
       const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
       const transaction: IDBTransaction = db.transaction("inspectionMaster", "readwrite");
       const dominos_data: IDBObjectStore = transaction.objectStore("inspectionMaster");
   
       try {
         const getAllRequest: IDBRequest<any[]> = dominos_data.getAll();
         getAllRequest.onsuccess = async () => {
           // Check if result is not empty and contains a key
           if (getAllRequest.result && getAllRequest.result.length > 0 && getAllRequest.result[0].key) {
             const key = getAllRequest.result[0].key;
       
             const url =`${apicallservice.apiURL}checkKey_DB?key=${key}`;
             try {
               const result = await http.get<boolean>(url).toPromise();
       
               if (result) {
                 console.log("Value matched");
               } else {
                 console.log("Value did not match");
       
                 const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
                 const transaction: IDBTransaction = db.transaction("inspectionMaster", "readwrite");
                 const dominos_data: IDBObjectStore = transaction.objectStore("inspectionMaster");
                 const deleteRequest = dominos_data.delete(key);
       
                 deleteRequest.onsuccess = (event) => {
                   console.log("Data deleted successfully", event);
       
                   http.get(apicallservice.apiURL + "get_Master_Value_for_DB").subscribe((result: any) => {
                     if (result) {
                       const transaction = db.transaction("inspectionMaster", "readwrite");
                       const store = transaction.objectStore("inspectionMaster");
       
                       console.log(result)
                       try {
                         store.add(result);
                       } catch (error) {
                         if (error instanceof DOMException && error.name === "ConstraintError") {
                           // Handle constraint error
                         } else {
                           console.error("Error saving data locally:", error);
                         }
                       }
                     }
                   });
                 };
       
                 deleteRequest.onerror = (event) => {
                   console.error("Error deleting data:", deleteRequest.error);
                 };
               }
             } catch (error) {
               console.error("Error:", error);
             }
           } else {
             // If result is empty or undefined, call the API to get the data
             http.get(apicallservice.apiURL + "get_Master_Value_for_DB").subscribe((result: any) => {
               if (result) {
                 const transaction = db.transaction("inspectionMaster", "readwrite");
                 const store = transaction.objectStore("inspectionMaster");
       
                 try {
                   store.add(result);
                 } catch (error) {
                   if (error instanceof DOMException && error.name === "ConstraintError") {
                     // Handle constraint error
                   } else {
                     console.error("Error saving data locally:", error);
                   }
                 }
               }
             });
           }
         };
       } catch (error) {
         console.error("Error:", error);
       }
     };
   
     openRequest.onupgradeneeded = (event) => {
       const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
       // console.log("Creating object store...");
       db.createObjectStore("inspectionMaster", { keyPath: "key", autoIncrement: true });
     };
   }
   openOrCreateDatabase("offlinedominus", 1);
 }
  ngOnInit(){
    this.http.get<string[]>(`${environment.serverUrl}api/fetch_section`).subscribe((data) => {      this.units = data;
      console.log(this.units);
      
    });
    const document_id = sessionStorage.getItem('document_id');
    const documentId = document_id!; // Non-null assertion
    const unitNo = this.val!; // Non-null assertion
    // const section = 'your_section'; // Adjust or define section variable

    
   


    this.http.get<any[]>(`${this.baseUrl}records`, {
      params: {
        document_id: documentId,
        unit_no: unitNo,
        // section: section
      }
    })
    .subscribe(data => {
      this.records = data;
      console.log('records',this.records);
      this.checkFunctionalPointYChecked1();   
    });
  }
  checkFunctionalPointYChecked1() {
    for (const record of this.records) {
      if (record.risk_level === "5" && record.checked==true) {
        this.hasFunctionalPointYChecked1 = false;
        console.log('risk level',this.hasFunctionalPointYChecked1);
        break;
      }
    }
  }

  async checkIfRecordExists(unit: string,value:string): Promise<boolean> {
    const document_id = sessionStorage.getItem('document_id');
    const unit_no = this.val;
    console.log('unit no is ',unit_no);
    
    try {
      const result = await this.http.get<boolean>(`${this.baseUrl}api/check_record_exists`, {
        params: {
          document_id: document_id!,
          unit_no: unit_no!
        }
      }).toPromise();
      return result || false; // Ensure result is boolean
    } catch (error) {
      console.error("Error checking record existence:", error);
      return false; // Default to false in case of error
    }
  }

  // proceed(unit: string) {
  //   console.log("Clicked on unit:", unit);
  
  //   if (unit) {
  //     this.router.navigate(['afterlogin', 'spec', unit]).then(
  //       () => console.log('Navigation successful'),
  //       (error) => console.error('Navigation failed:', error)
  //     );
  //   } else {
  //     console.error('Invalid unit value:', unit);
  //   }
  // }
  // async proceed(unit: string,value:string) {
  //   console.log("Clicked on unit:", unit);

  //   if (unit) {
  //     const recordExists = await this.checkIfRecordExists(unit,value);
  //     if (recordExists) {
  //       alert("Data already exists");
  //       this.router.navigate(['afterlogin', 'spec', unit]).then(
  //         () => console.log('Navigation successful'),
  //         (error) => console.error('Navigation failed:', error)
  //       );
  //     } else {
  //       this.router.navigate(['afterlogin', 'spec', unit]).then(
  //         () => console.log('Navigation successful'),
  //         (error) => console.error('Navigation failed:', error)
  //       );
  //     }
  //   } else {
  //     console.error('Invalid unit value:', unit);
  //   }
  // }

async proceed(unit: string, value: string) {
    console.log("Clicked on unit:", unit);
    
    if (unit) {
      this.isLoading = true; // Start loading
  
      const recordExists = await this.checkIfRecordExists(unit, value);
      this.isLoading = false; // Stop loading once record check is complete
      
      if (recordExists) {
        const userConfirmation = confirm("Data already exists. Click 'cancel' to stop or 'ok' to proceed.");
  
        if (userConfirmation) {
          // If user clicked "OK" to continue
          this.isLoading = true; // Set loading state before navigation
          this.router.navigate(['afterlogin', 'spec', unit]).then(
            () => {
              this.isLoading = false; // Stop loading after successful navigation
              console.log('Navigation successful');
            },
            (error) => {
              this.isLoading = false; // Stop loading if navigation fails
              console.error('Navigation failed:', error);
            }
          );
        } else {
          console.log('User chose not to proceed with navigation');
        }
      } else {
        // Proceed directly if record does not exist
        this.isLoading = true; // Set loading state before navigation
        this.router.navigate(['afterlogin', 'spec', unit]).then(
          () => {
            this.isLoading = false; // Stop loading after successful navigation
            console.log('Navigation successful');
          },
          (error) => {
            this.isLoading = false; // Stop loading if navigation fails
            console.error('Navigation failed:', error);
          }
        );
      }
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

  proceed1(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'pit', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }
  shutdown(){
    const contract_no = sessionStorage.getItem('contract_no');
    const document_id = sessionStorage.getItem('document_id');


    this.router.navigate(['shut_down',contract_no,document_id,this.val]);
  }
  proceed2(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'cabin', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }
  proceed3(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'cartop', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }
  proceed4(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'machineroom', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

  check(){
    console.log('working');
    
  }
  back(){
    const document_id = sessionStorage.getItem('document_id');

    this.router.navigate(['afterlogin','unit',document_id])
  }

  proceed5(unit: string) {
    console.log("Clicked on unit:", unit);
  
    if (unit) {
      this.router.navigate(['afterlogin', 'floorlanding', unit]).then(
        () => console.log('Navigation successful'),
        (error) => console.error('Navigation failed:', error)
      );
    } else {
      console.error('Invalid unit value:', unit);
    }
  }

}

