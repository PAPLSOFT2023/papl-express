
import { Component, ElementRef, ViewChild,Renderer2,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import { ApicallService } from 'src/app/apicall.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inspection-master',
  templateUrl: './inspection-master.component.html',
  styleUrls: ['./inspection-master.component.scss']
})
export class InspectionMasterComponent {
  inspectionCount: number = 0;
  constructor(private http: HttpClient, private apicallservice: ApicallService,  private renderer: Renderer2,private router: Router,private formBuilder: FormBuilder) {

  this.entryForm = this.formBuilder.group({
    product: ['', Validators.required],
  parts: ['', Validators.required],
  description: ['', Validators.required],
  reference: ['', Validators.required],
  Risklevel: ['', Validators.required],
  photo: ['', Validators.required],
  dropdown: ['', Validators.required],
  functional_point: ['', Validators.required],
  Emergency_Features: ['', Validators.required],
  Customer_Scope: ['', Validators.required],
  MNT_ADJ : ['', Validators.required],
  marks: ['', Validators.required],
  security: ['', Validators.required],
  dropdown_count: ['', Validators.required]
});
    
}

items: any[] = [];
entryForm: FormGroup = new FormGroup({
  product: new FormControl('', Validators.required),
  parts: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required),
  reference: new FormControl('', Validators.required),
  Risklevel: new FormControl('', Validators.required),
  photo: new FormControl('', Validators.required),
  dropdown: new FormControl('', Validators.required),
  functional_point: new FormControl('', Validators.required),
  Emergency_Features: new FormControl('', Validators.required),
  Customer_Scope: new FormControl('', Validators.required),
  MNT_ADJ : new FormControl('', Validators.required),
  marks: new FormControl('', Validators.required),
  security: new FormControl('', Validators.required),
  dropdown_count : new FormControl('', Validators.required)
});



ngOnInit() {
    // Fetch the count when the component initializes
    this.getInspectionCount();
}

// Method to fetch the inspection count from the API
getInspectionCount(): void {
  this.http.get<any>(`${environment.serverUrl}inspection-master-count`)
    .subscribe(
      (response: any) => {
        // Assuming the API returns an object with a 'count' property, e.g., { count: 100 }
        const count = response.count;  // Adjust this if the API response structure differs

        console.log('Inspection count:', count);

        // Animate the count change from the current value to the fetched count
        this.animateCount(this.inspectionCount, count);
        
        // Update the count after the animation is triggered
        this.inspectionCount = count;
      },
      (error) => {
        console.error('Error fetching inspection count:', error);
        // Optionally, set a fallback value or handle the error as needed
      }
    );
}


// Example animateCount function to smoothly transition the count number
animateCount(start: number, end: number) {
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(2000 / (end - start))); // 2000ms for the full animation time
  
  const interval = setInterval(() => {
    current += increment;
    this.inspectionCount = current;
    
    if (current === end) {
      clearInterval(interval);  // Stop the animation when the target is reached
    }
  }, stepTime);
}






// this is profile data 
editForm: boolean = false; // Assume this flag controls the visibility of the edit form
editEntryForm: FormGroup = new FormGroup({
  product: new FormControl('', Validators.required),
  parts: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required),
  reference: new FormControl('', Validators.required),
  photo: new FormControl('', Validators.required),
  dropdown: new FormControl('', Validators.required),
  functional_point: new FormControl ('', Validators.required),
  Emergency_Features: new FormControl ('', Validators.required),
  Customer_Scope: new FormControl ('', Validators.required),
  MNT_ADJ : new FormControl ('', Validators.required),
  marks: new FormControl ('', Validators.required),
  security: new FormControl ('', Validators.required),
  dropdown_count: new FormControl ('', Validators.required)
  // Add other form controls as needed
}); 


formData: any = {};
isEdit: boolean = false;


isUploadPopupVisible: boolean = false;


isUploading: boolean = false; // Add this line
fileName: string = ''; // Add this line

selectedData: string = ''; // selected Department Data
NewRole_Data:string='';// getting new role
isDataEntryVisible: boolean = false;



departments: string[] = [];
roles: string[] = [];
organizations: string[] = [];



Dump_Usage:string[]=[];
Dump_Usage_INSERT:string='';

Dump_Type:string[]=[];
Dump_Type_INSERT:string='';

Home_Type:string[]=[];
Home_Type_INSERT:string='';

Home_Usage:string[]=[];
Home_Usage_INSERT:string='';

Ins_Time:string[]=[];
Ins_Time_INSERT:string='';

Ins_Time_Insp:string[]=[];
Ins_time_Insp_INSERT:string='';

OEM_Details:string[]=[];
OEM_Details_INSERT:string='';

Region_Details:string[]=[];
Region_Details_INSERT:string='';

Type_Bul_Details:string[]=[]
Type_Bul_Details_INSERT:string='';

Travel_Acc_Details:string[]=[];
Travel_Acc_Details_INSERT:string='';
Type_ele_Details:string[]=[];
Type_ele_Details_INSERT:string='';

departmenttext:string=''
newRollData: string = '';
RolldataItems: string[] = [];
newDepartmentData: string = '';
DepartmentdataItems: string[] = [];
 uniqueRolls = new Set<string>();
 uniqueDepartments = new Set<string>();
 psnNumbers: string[] = [];
 selectedFile: File | null = null;


tooltipText: string = ''
organizationRoles !:any[];


// Properties for controlling the popup forms
isPopupVisible1: boolean = false;
isPopupVisible2: boolean = false;
flag_manual_Entry:boolean=false;
addForm:boolean=false;



isPopupVisible3: boolean = false;
isPopupVisible4: boolean = false;
isPopupVisible5: boolean = false;
isPopupVisible6: boolean = false;
isPopupVisible7: boolean = false;



newItem: { Product: string, Parts: string, Description: string, Reference: string, Photo: string, Dropdown: string } = {
Product: '',
Parts: '',
Description: '',
Reference: '',
Photo: '',
Dropdown: ''
};

// Reference to the popup form element in the template
@ViewChild('popupForm') popupForm!: ElementRef;




// Method to save data
saveData(): void {
  if (this.newRollData.trim() !== '') {
    this.RolldataItems.push(this.newRollData);
    this.newRollData = ''; // Clear the input field
    this.isDataEntryVisible = false;
  }
}

// Method to cancel data entry
cancelData(): void {
  this.newRollData = '';
  this.isPopupVisible1 = false;
  this.isPopupVisible2 = false;
  this.isPopupVisible3 = false;
  this.isPopupVisible4 = false;
  this.isPopupVisible5 = false;
  this.isPopupVisible6 = false;
  this.isPopupVisible7 = false;
}


cancelData1(): void {
 
     this.isPopupVisible1 = false;
}




// Method to close the popup form
closePopupForm(): void {
  this.isPopupVisible1 = false;
  this.isPopupVisible2 = false;
  this.isPopupVisible3 = false;
  this.isPopupVisible4 = false;
  this.isPopupVisible5 = false;
  
}

  // toggleDataEntryContainer() {
  //   this.isPopupVisible5 = !this.isPopupVisible5; // Toggle the visibility state
  // }
  toggleDataEntryContainer2() {
    this.isPopupVisible6 = !this.isPopupVisible6; // Toggle the visibility state
  }
  
  toggleDataEntryContainer3() {
    this.isPopupVisible7 = !this.isPopupVisible7; // Toggle the visibility state
  }

  toggleDataEntryContainer() {
    this.isUploadPopupVisible = !this.isUploadPopupVisible;
  }


  manualentry_click() {
    // // Toggle the visibility of the popup and flag for manual entry
    // this.isPopupVisible5 = !this.isPopupVisible5;
    // this.flag_manual_Entry = !this.flag_manual_Entry;

    // Call the API to get master checklist data
    this.apicallservice.get_master_checklist().subscribe(
      (response: any) => {
        if (response) {
          this.items = response;
          console.log(this.items);

          // After getting the data, redirect to another page
          this.router.navigate(['afterlogin','check_list']); // Replace 'your-target-route' with the actual route path you want to redirect to
        }
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  

  addItem() {
    // Call your service to add a new item
    // Example: this.yourCrudService.addItem(this.formData);
    this.resetForm();
    // this.fetchData(); // Refresh the table after adding an item
  }

  editItem(item: any) {
    this.formData = { ...item };
    this.isEdit = true;
  }

  updateItem() {
    // Call your service to update the item
    // Example: this.yourCrudService.updateItem(this.formData);
    this.resetForm();
    // this.fetchData(); // Refresh the table after updating an item
  }

  //delete crud inspection_checklist direct api call//
  deleteItem1(item: any): void {
    console.log('item id is ',item);
    const params = { params: { items: item } };      // Assuming 'deleteItem' is a method in your ApiService
    this.http.delete(`${environment.serverUrl}api/inspection_delete`, params).subscribe(
              (response) => {
        console.log('Data delete successfully', response);
        const successMessage = 'Data Delete Success...!';
        const userConfirmation = window.confirm(successMessage);
        if(userConfirmation){
          // this.router.navigate(['afterlogin/plan_eg_home']);
        }
      },
      (error) => {
        console.error('Error storing data', error);
      }
    );
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.formData = {};
    this.isEdit = false;
  }

  closeEntry() {
    this.flag_manual_Entry = false;
  }
 
  OpenEntry() {
    this.addForm = !this.addForm;
  }
  editEntry(item: any) {
    // Implement your logic to enter the edit mode for the selected item
    console.log("Editing item:", item);
    // You can, for example, set a flag to indicate that the row is in edit mode
  }
  submitForm(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior
  
    if (this.entryForm.valid) {
      // Access form values using this.entryForm.value
      const formData = this.entryForm.value;
  
      // Print the form data to the console

      console.log('Form submitted:', formData);
      this.apicallservice.insp_check_list_ADD(
        formData.description, formData.dropdown, formData.parts, formData.photo, formData.product, formData.reference,formData.Risklevel,formData.functional_point,formData.Emergency_Features,formData.Customer_Scope,formData.MNT_ADJ,formData.marks,formData.security,formData.dropdown_count,formData.INF30_Key_Abstract_S_No
                  )
                  .subscribe((response:any)=>{
                    if(response)
                    {
                      console.log(response.message)
                      if(response.message=="Record insert successfully")
                      {
                        alert("Record insert successfull")
 
  // const newItem = {
  //   Product: formData.product,
  //   Parts: formData.parts,
  //   Description: formData.description,
  //   Reference: formData.reference,
  //   Photo:formData.photo,
  //   Dropdown:formData.dropdown,
    
  // };
                        // this.items.push(newItem)




                      }
                      else{
                        alert("Record Not insert")
                      }
                    }
                  },(error:any)=>{})
  
      // Add the logic to save the data or perform other actions
  
      // After handling submission, close the form
      this.closeEntry();
    } else {
      // Form is not valid, highlight errors or display a message
      console.log('Form is invalid. Please check the fields.');
    }
  }
  openEditForm(item:any) {
    // This function will be called when the "Edit" button is clicked
    // It toggles the value of editForm to show/hide the form
   
    this.editEntryForm.setValue({
      id:item.id,
      product: item.Product || '', // Assuming item[0] corresponds to the first form control
      parts: item.Parts  || '',   // Assuming item[1] corresponds to the second form control
      description: item.Description || '',
      reference: item.Reference || '',
      photo: item.Photo || '',
      dropdown: item.Dropdown || ''
      // Add other form controls as needed
    });
    this.editForm = !this.editForm;
  }
  submitEditForm(): void {
    if (this.editEntryForm.valid) {
      const formData = this.editEntryForm.value;
      console.log('Form submitted:', formData);
  
      // Assuming you have an identifier for the data and a method in ApiCallService to update data
      this.apicallservice.insp_check_list_update(formData.id,
        formData.description, formData.dropdown, formData.parts, formData.photo, formData.product, formData.reference,formData.Risklevel,formData.functional_point,formData.Emergency_Features,formData.Customer_Scope,formData.MNT_ADJ,formData.marks,formData.security,formData.dropdown_count,formData.INF30_Key_Abstract_S_No
      ).subscribe(
    
        (response: any) => {
          if (response) {
            console.log(response.message);
            if (response.message == "Record insert successfully") {
              alert("Record insert successful");
            } else {
              alert("Record Not inserted");
            }
          }
        },
        (error: any) => {
          // Handle error, you might want to log or display an error message
          console.error('Error:', error);
        }
      );
  
      this.closeEntry();
    } else {
      // Form is not valid, highlight errors or display a message
      console.log('Form is invalid. Please check the fields.');
    }
  }

  cancel_Edit() {
    // This function will be called when the "Cancel" button is clicked
    // It closes the form by setting `editForm` to false
    this.editForm = false;
  }

    openUploadPopup(){
    this.isUploadPopupVisible = true;

  }
  
  

  
  




  onFileChange_XL(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    console.log("function called")
    if (!this.selectedFile) {
      alert('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
  

     
    this.apicallservice.uploadFile(formData).subscribe(
        (response: any) => {
          alert(response.message );
        },
        (error) => {
          console.error('Error uploading file:', error);
          alert('Error uploading file. Please try again. '+ JSON.stringify(error.details));
        }
      );
  }
  
 // Method to close the popup
 closePopup() {
  this.isUploadPopupVisible = false;
}
  


  close_popform() {
    // Method to close the popup form
    this.isUploadPopupVisible = false;
  }

 




  }
  