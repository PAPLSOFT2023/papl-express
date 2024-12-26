import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DataService } from 'src/app/data.service';
import { ApicallService } from 'src/app/apicall.service';
import { response } from 'express';
interface PitDataItem {
  Description:string
  Dropdown: string;
  Photo: string;
  Reference: string;
  Negative_MNT: string;
  Negative_ADJ: string;
  Positive_ADJ: number;
  Positive_MNT: number;
  Emergency_Features: boolean;
  Customer_Scope: boolean;
  functional_point:string;
  Risklevel:string;
  id:string

}


@Component({
  selector: 'app-pit',
  templateUrl: './pit.component.html',
  styleUrls: ['./pit.component.scss']
})
export class PitComponent {
  val :string | null='';
  name:string | null ='';
  document_id:string | null ='';
  unit_no:string|null='';
  isLoading = true;


  // steps: string[] = [];
  steps: { description: string; reference: string }[] = [];
  completedStatus: boolean[] =[];



  constructor(private route: ActivatedRoute,private apicallService: ApicallService,private http :HttpClient,private router:Router,private cdr:ChangeDetectorRef){
     this.route.paramMap.subscribe(params => {
      this.val = params.get('c_no');
      console.log(this.val);
      
    });

  }
  ngOnInit(){
    this.document_id = sessionStorage.getItem('document_id');
    console.log('document id is ',this.document_id);
    this.unit_no=sessionStorage.getItem('unit_no');
    console.log('unit number is',this.unit_no);
    console.log('section is ',this.val);
    this.name = sessionStorage.getItem('UserName') as string;
    console.log('inspector name',this.name);
  
    if (this.val !== null) {
  
      const openRequest: IDBOpenDBRequest = indexedDB.open("offlinedominus", 1);
      openRequest.onerror = (event) => {
        console.error("Failed to open database:", (event.target as IDBOpenDBRequest).error);
      };
    
      openRequest.onsuccess = async (event) => {
        console.log("Database opened successfully.");
    
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
        const transaction: IDBTransaction = db.transaction("inspectionMaster", "readwrite");
        const dominos_data: IDBObjectStore = transaction.objectStore("inspectionMaster");
        const getRequest: IDBRequest<IDBCursorWithValue | null> = dominos_data.openCursor();
  
               getRequest.onsuccess = (event) => {
                   const cursor: IDBCursorWithValue | null = (event.target as IDBRequest<IDBCursorWithValue>).result;
  
                   if (cursor) {
                       const record = cursor.value;
  
                      //  Replace the pitData
                      //  const pitData = record.cabin;
                      // const pitData = record.car_top;
                      // const pitData = record.machine_room;
                      // const pitData = record.car_top;
                       const pitData = record.pit;
                       console.log("Pit data:", pitData);
                       pitData.forEach((item: PitDataItem) => {
                        this.steps.push({
                          description: item.Description, // Store the description
                          reference: item.Reference       // Store the corresponding reference
                        });
                      });
                 
                  this.apicallService.Check_check_data_exists(
                    this.document_id,
                    this.unit_no,
                    this.val,
                    this.name,
                    this.steps.map(step => step.description)
                  ).subscribe(
                    (responseArray: any) => {
                      if (responseArray) {
                        this.completedStatus = responseArray;
                        console.log('complete status',this.completedStatus);
                        
                      }
                      // Delay hiding the loader by 1 second after a successful response
                      setTimeout(() => {
                        this.isLoading = false;
                        this.cdr.detectChanges(); // Trigger change detection manually if needed
                      });
                    },
                    (error) => {
                      // Log the error and delay hiding the loader by 1 second in case of an error
                      console.error('API Error:', error);
                      setTimeout(() => {
                        this.isLoading = false;
                        this.cdr.detectChanges(); // Trigger change detection manually if needed
                      });
                    }
                  );
          
   
                       
                       cursor.continue();
                   } else {
                       console.log("No more records");
                   }
               };
  
               getRequest.onerror = (event) => {
                   console.error("Error fetching data from IndexedDB:", getRequest.error);
               };
    
       
      };
    
      openRequest.onupgradeneeded = (event) => {
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
        // console.log("Creating object store...");
        db.createObjectStore("inspectionMaster", { keyPath: "key", autoIncrement: true });
      };
  
  
  
  
  
      
   
   
  }
  else{
    alert("Session Expired, Please Login again")
  }
  }



  getLogoLetters(step: string): string {
    const words = step.split(' '); // Split step into words
    let logo = ''; // Initialize the logo string
    if (words.length > 0) {
      logo += words[0].charAt(0); // Add the first letter of the first word
    }
    if (words.length > 1) {
      logo += words[1].charAt(0); // Add the first letter of the second word
    }
    return logo;
  }
  back(){
    this.router.navigate(['afterlogin','section',this.unit_no]);
  }
  next(){
    this.router.navigate(['afterlogin','cabin','cabin'])
  }

handleCardClick(step: { description: string; reference: string }) {
  const index = this.steps.findIndex(s => s.description === step.description);

  if (step.reference) {
    
    alert(`Reference: ${step.reference}`);
  }

  if (index !== -1 && this.completedStatus[index]) {
    const confirmation = window.confirm('Data Exists, Do you really want to change?');
    
    if (!confirmation) {
      return;
    }
  }

  const id = encodeURIComponent(step.description);

  // Proceed with navigation if the step is not completed or the user clicked "OK"
  // const id = encodeURIComponent(step);
  this.router.navigate(['afterlogin', 'pitcheckpoint', id, this.document_id, this.unit_no, this.name, this.val]);
}



//offline
handleCardClick1(step: { description: string; reference: string }) {
  const key = `${this.document_id}+${this.unit_no}+${step.description}`;
  console.log("Generated Key:", key);

  if (step.reference) {
    alert(`Reference: ${step.reference}`);
  }

  // Open IndexedDB database 'OutBox'
  const openRequest = indexedDB.open("OutBox", 1);

  openRequest.onerror = (event) => {
    console.error("Failed to open IndexedDB 'OutBox':", (event.target as IDBOpenDBRequest).error);
  };

  openRequest.onsuccess = (event) => {
    console.log("Database 'OutBox' opened successfully.");
    const db = (event.target as IDBOpenDBRequest).result;

    // Transaction to read data
    const transaction = db.transaction("yourStoreName", "readonly");
    const store = transaction.objectStore("yourStoreName");

    // Fetch data for the specific key
    const getRequest = store.get(key);

    getRequest.onsuccess = () => {
      const result = getRequest.result;

      if (result) {
        console.log("Data found in IndexedDB for the given key:", result);
      } else {
        console.log("No data found in IndexedDB for the given key:", key);
      }

      // Log all key-value pairs
      console.log("Retrieved Data:", result);
    };

    getRequest.onerror = () => {
      console.error("Error retrieving data from IndexedDB for the given key:", getRequest.error);
    };
  };

  openRequest.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;

    // Ensure object store exists (replace 'yourStoreName' with actual name)
    if (!db.objectStoreNames.contains("yourStoreName")) {
      db.createObjectStore("yourStoreName", { keyPath: "key" });
    }
  };
}


}


