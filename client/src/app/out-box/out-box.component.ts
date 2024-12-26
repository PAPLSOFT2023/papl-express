import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-out-box',
  templateUrl: './out-box.component.html',
  styleUrls: ['./out-box.component.scss']
})
export class OutBoxComponent {
  isconnectivity:boolean = false;
  inspectorName!: string;
   allValues!: any[];
   syncing: boolean = false;
   DataNotAvai:string="No Data Available in OutBox"

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
    id_no:string,
    marks:number


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
  // console.log("All records:", this.allValues.length);
};

getAllRequest.onerror = () => console.error("Error retrieving records", getAllRequest.error);
 
  }
}







async syncData() {
  this.syncing = true;
  let final_result:any[]=[]
  let count=0;
  const syncPromises = await Promise.all(this.allValues.map(async (value) => {
    let flag:boolean=false;
    let key:string=''
    let count_loc=0
    let final_result: any[] = [];
    let count = 0;
    

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
        formData.append("marks",String(value.marks));
        formData.append("risk_level",String(value.risk_level[i]))
        formData.append("functional_point",String(value.functional_point[i]))
        console.log('functional point',String(value.functional_point[i]));
        console.log('risk level',String(value.risk_level[i]));
        console.log('id no',value.id_no);
        console.log('mark',String(value.marks));
        
        
        
        
        




        try {
            const res = await this.http.post<any>(this.apicallservice.apiURL+'syncOff', formData).toPromise();
            if (res) {
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
                 deleteFromIndexedDB(this.inspectorName,inner.key)
                  const indexToRemove = this.allValues.findIndex((value: any) => value.key === inner.key);
                  if (indexToRemove !== -1) {
                      this.allValues.splice(indexToRemove, 1);
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











async function openIndexedDB(inspector:string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("OutBox", 1); // Adjust the name and version as needed

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(inspector)) {
        db.createObjectStore(inspector, { keyPath: "id" }); // Adjust according to your keyPath or use autoIncrement
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfully");
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("Error opening database:", request.error);
      reject(request.error);
    };
  });
}


async function deleteFromIndexedDB(inspector:string,key: string): Promise<void> {
  try {
    const db = await openIndexedDB(inspector);
    const transaction = db.transaction(inspector, "readwrite");
    const store = transaction.objectStore(inspector);
    const request = store.delete(key);

    console.log("fun delete called")
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log(`Transaction completed for key: ${key}`);
      };

      request.onsuccess = () => {
        console.log("Entry deleted successfully");
        
        resolve();
      };

      request.onerror = () => {
        console.error("Error deleting entry from IndexedDB", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error deleting entry from IndexedDB", error);
    throw error; // Ensure upstream error handling
  }
}