import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-pre-process',
  templateUrl: './data-pre-process.component.html',
  styleUrls: ['./data-pre-process.component.scss']
})
export class DataPreProcessComponent {
  isconnectivity:boolean = false;
  inspectorName:string;
   allValues!: any[];
   syncing: boolean = false;
   DataNotAvai:string="No Data Available in OutBox"

   groupedArray!:any[];

  constructor(private route: ActivatedRoute,private apicallservice:ApicallService,private http:HttpClient) {
    this.inspectorName = sessionStorage.getItem("UserName") ?? '';

    http.get(apicallservice.apiURL+"check_connectivity").subscribe((request:any)=>{ 
      if(request!=null && request===true)
        {
          console.log("",request)

          this.isconnectivity=true
        }
    },(err:any)=>{

      this.isconnectivity=false
    })

    this.getvalu();
   } 


getvalu(){

  interface ValuesObj {
    key: string;
    documentId: string;
    inspectorName: string;
    unitNo: string;
    title: string;
    valueArray: string[];
    checkpoint: boolean[];
    capturedImages: any[];
    needForReport: boolean[]; 
    risk_level:string[];
    functional_point:string[];
    id_no:string


  }
  
  const openRequest: IDBOpenDBRequest = indexedDB.open("OutBox", 1);
 

  openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
const offlineStore: IDBObjectStore = db.createObjectStore(this.inspectorName, { keyPath: "key" });
  };





  openRequest.onerror = (event) => {
console.error("IndexedDB error:", openRequest.error);
  };
  openRequest.onsuccess = (event) => {
const db: IDBDatabase = openRequest.result;
// Example: Adding a record
const transaction: IDBTransaction = db.transaction(this.inspectorName, "readwrite");
const offlineStore: IDBObjectStore = transaction.objectStore(this.inspectorName);

// Example: Retrieving all records
const getAllRequest: IDBRequest<ValuesObj[]> = offlineStore.getAll();

getAllRequest.onsuccess = () => {
   this.allValues = getAllRequest.result;
   const groupedValues = this.allValues.reduce((acc, curr) => {
    const key = `${curr.unitNo}-${curr.documentId}`;
  
    if (!acc[key]) {
      acc[key] = {
        unitNo: curr.unitNo,
        documentId: curr.documentId,
        entries: []
      };
    }
  
    acc[key].entries.push(curr);
  
    return acc;
  }, {});
  
  this.groupedArray= Object.values(groupedValues);
  
  // console.log();
  console.log("All records:", this.allValues);
  const targetKey = '1236+p1+PIT IDENTIFICATION';

// Find the object with the matching key
const result = this.allValues.find(record => record.key === targetKey);
console.log("finded item",result);

  console.log("All records grouped:", this.groupedArray);
};

getAllRequest.onerror = () => console.error("Error retrieving records", getAllRequest.error);
 
  }
}







async syncData(index:any) {
  this.syncing = true;
  let final_result:any[]=[]
  let count=0;
  const syncPromises = await Promise.all(this.groupedArray[index].entries.map(async (value:any) => {
    let flag:boolean=false;
    let key:string=''
    let count_loc=0
    let final_result: any[] = [];
    let count = 0;
console.log("-->",value)
    for (let i = 0; i < value.valueArray.length; i++) {
        const formData = new FormData();
        formData.append("key",value.key)
        formData.append("documentId",value.documentId)
        formData.append("inspectorName",value.inspectorName)
        formData.append("section",value.section)
        formData.append("unitNo",value.unitNo)
        formData.append("title",value.title)
        formData.append("valueArray",value.valueArray[i])
        formData.append("positive_MNT",String(value.positive_MNT))
        formData.append("positive_ADJ",String(value.positive_ADJ))
        formData.append("Negative_MNT",value.Negative_MNT[i])
        formData.append("Negative_ADJ",value.Negative_ADJ[i])    
        formData.append("Emergency_Features",String(value.emergency_Features))
        formData.append("Customerscope",String(value.customerscope))   
        formData.append("checkpoint",String(value.checkpoint[i]))
        formData.append("image",value.capturedImages[i])
        formData.append("NeedforReport",String(value.needForReport[i]))
        formData.append("id_no",value.id_no);
        formData.append("risk_level",String(value.risk_level[i]))
        formData.append("marks",String(value.marks));
        formData.append('count',value.valueArray.length)
        formData.append("functional_point",String(value.functional_point[i]))
        console.log('functional point',String(value.functional_point[i]));
        console.log('risk level',String(value.risk_level[i]));
        console.log('id no',value.id_no);

        console.log('mark',value.marks);
        
        
        
        




        try {
            const res = await this.http.post<any>(this.apicallservice.apiURL+'syncOff', formData).toPromise();
            if (res) {
              console.log("sync off result",res)
                if (res.message === "Record already exists, skipping insertion." || res.message === "Data synchronization complete") {

                    flag=true;
                    key=res.key 
                    count+=1;
                    count_loc+=1;
                    
                }
            }
        } catch (err) {
            // Handle error
        }
    }

    if (count_loc === value.valueArray.length) {
        final_result.push({"key":key,"flag":flag})
        flag=false;
        key=""
    } else {
        final_result.push({"key":null,"flag":null})
        flag=false;
        key=""
    }

    if (count === value.valueArray.length) {
        return final_result;
    } else {
        return null;
    }
}));


const syncStartedAt = Date.now();

  Promise.all(syncPromises)
    .then((results) => {
      results.forEach((result: any) => {
        result.forEach((inner:any)=>{
              if (inner.flag===true) {
                const result = this.allValues.find(record => record.key === inner.key);
                 deleteFromIndexedDB(index,result,this.inspectorName,inner.key)
                  const indexToRemove = this.allValues.findIndex((value: any) => value.key === inner.key);
                  if (indexToRemove !== -1) {
                      // this.allValues.splice(indexToRemove, 1);
                     this.groupedArray.splice(indexToRemove, 1);
                  }
              }
      });
        })
       this.DataNotAvai="Synced Successfull"
    })
    .catch((error) => {
      console.error('Error synchronizing data', error); 
    })
    .finally(() => {
      const syncEndedAt = Date.now();
      const elapsedTime = syncEndedAt - syncStartedAt;
      const minDisplayTime = 3000;
      if (elapsedTime < minDisplayTime) {
        setTimeout(() => {
          this.syncing = false;
        }, minDisplayTime - elapsedTime);
      } 
      else {
        this.syncing = false;
      }
    });
}












}











async function openIndexedDB(inspectorName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OutBoxCopy", 1); // Database name and version

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

      if (!db.objectStoreNames.contains(inspectorName)) {
        db.createObjectStore(inspectorName, { keyPath: "key" }); // Use appropriate keyPath
        console.log(`Object store '${inspectorName}' created`);
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfully ===");
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("Error opening database:", request.error);
      reject(request.error);
    };
  });
}



async function openIndexedDB_outbox(inspectorName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OutBox", 1); // Database name and version

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

      if (!db.objectStoreNames.contains(inspectorName)) {
        db.createObjectStore(inspectorName, { keyPath: "key" }); // Use appropriate keyPath
        console.log(`Object store '${inspectorName}' created`);
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfully +++");
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("Error opening database:", request.error);
      reject(request.error);
    };
  });
}





async function deleteFromIndexedDB(index:number,recordvalue:any,inspectorName: any, key1: string): Promise<void> {
 
 
  console.log("zzz",key1)
  const db = await openIndexedDB(inspectorName);
  const transaction = db.transaction(inspectorName, "readwrite");
  const store = transaction.objectStore(inspectorName);
  try {
   

    // const request = store.add("record");
    

    // Check if the record exists
    const existingRecordRequest = store.get(key1);

    existingRecordRequest.onsuccess = function(event) {
      const existingRecord = existingRecordRequest.result;

      if (existingRecord) {
        // Update the existing record
        const updatedRecord = { ...existingRecord, ...recordvalue }; // Merge existing record with new values
       
        console.log("data put to the indeaxdb",recordvalue);
        
       
        const updateRequest = store.put(updatedRecord);
        
        updateRequest.onsuccess = function() {
          console.log("Data updated locally:", updatedRecord);
          deleteFromIndexedDB_Aftersync(inspectorName,key1)
          // const indexToRemove = this.allValues.findIndex((value: any) => value.key === inner.key);
          // if (indexToRemove !== -1) {
          //     this.allValues.splice(indexToRemove, 1);
          // }
        };

        updateRequest.onerror = function() {
          console.error("Error updating data:", updateRequest.error);
        };
      } 
      
      else {
        // Add a new record
        console.log("data added ",recordvalue);
        
        const addRequest = store.add(recordvalue);
        
        addRequest.onsuccess = function() {
          console.log("Data saved locally:", recordvalue);
          deleteFromIndexedDB_Aftersync(key1,inspectorName)
          // const indexToRemove = this.allValues.findIndex((value: any) => value.key === inner.key);
          // if (indexToRemove !== -1) {
          //     this.allValues.splice(indexToRemove, 1);
          // }
        };

        addRequest.onerror = function() {
          console.error("Error adding data:", addRequest.error);
        };
      }
    };

    existingRecordRequest.onerror = function() {
      console.error("Error retrieving data:", existingRecordRequest.error);
    };

    transaction.oncomplete = function() {
      console.log("Transaction completed successfully");
    };

    transaction.onerror = function() {
      console.error("Transaction error:", transaction.error);
    };

  } catch (error) {
    console.error("Error saving or updating data locally:", error);
  }
}



async function deleteFromIndexedDB_Aftersync(key: string,inspector:string): Promise<void> {
  try {
    const db = await openIndexedDB_outbox(inspector);
    console.log("fun delete called__",inspector)
    const transaction = db.transaction(inspector, "readwrite");
    
    const store = transaction.objectStore(inspector);
    
    const request = store.delete(key);

    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log(`Transaction completed for key: ${key}`);
      };

      request.onsuccess = () => {
        console.log("Entry deleted successfully");
        
        resolve();
      };

      request.onerror = () => {
        console.error("Error deleting entry from outbox", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error deleting entry from outbox", error);
    throw error; // Ensure upstream error handling
  }
}