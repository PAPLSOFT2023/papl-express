import { Component,ChangeDetectionStrategy,ChangeDetectorRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportDataService } from 'src/app/Data/report-data.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { response } from 'express';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
// import * as JSZip from 'jszip'; 
import JSZip from 'jszip';
 // Import JSZip if you're using a module system (e.g., Angular/TypeScript)
import { saveAs } from 'file-saver';
interface ListItem {
  value: string;
  selected: boolean;
}
interface Image {
  img: string; // Assuming the blob data is stored as base64 encoded string
}
@Component({
  selector: 'app-unitselectionfor-report',
  templateUrl: './unitselectionfor-report.component.html',
  styleUrls: ['./unitselectionfor-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitselectionforReportComponent {
  @ViewChildren('myTable')
  myTables!: QueryList<ElementRef>;

  inf_26:any;

  isAllSelected: boolean = false; // Track the state of "Select All"
  isButtonDisabled: boolean = false; // Initial state is enabled
  isProceedDisabled: boolean = false;   // For the Proceed button
  isGenerateDisabled: boolean = true;    // Start with the Generate button disabled
  proceedClicked = false;
  selectAllUnitsChecked: boolean = false; // For "Select all" checkbox


  isLoading:boolean=true

  Description_and_Parts:{Description:string,Parts:string}[]=[]
  parts_for_UI:string[]=[]

  images: any[] = [];
  report_id:string |null='';




selectedImages: { [key: number]: string } = {};
showTable = false;



  selectedFile: File | null = null;
  imageUrl: any | null = null;

  selectedUnits: { unit: string, isSelected: boolean }[] = [];
  selectedOrder: string[] = [];
  showSecondTable = false;
  unit: string[] = [];
  unitArray: { unit: string, isSelected: boolean }[] = [];


  documentidForUrl: string="";
  contractNo:string="";

  isDisabled: boolean = true;



  // unit_no, description, dropdown_option, checked, img, needforReport, section
  Dataservice_Record_Values_local:{
    checked:boolean;
    description:string;
   
    dropdown_option:string;
    
    img:any;
   
    needforReport:boolean;
    section:string;
    unit_no:string,
    
  
  }[]=[]

  image_val: { [key: string]:{[key:string]: { [key:string]: { [key:string]: any[] } } }} = {};


// Record_img_Val:{   description:string;   unit        :string; img: any;checked:boolean }[] = [];
// Adjust the type definition of Record_img_Val to allow null for img
Record_img_Val: { description: string; units: { unit: string; check: boolean; img: { id: number; blob: any }[];}[] }[] = [];
// Record_img_Val: { description: string; units: { unit: string; check: boolean; img: { id: number; blob: any; } }[] }[] = [];


    checkedStates: {[description: string]: number} = {};

  

  selected_unit=[];



  


  constructor(private router:Router,private sanitizer: DomSanitizer,private http: HttpClient,private apicallservice: ApicallService,public dataservice:ReportDataService, private route: ActivatedRoute,private cdr: ChangeDetectorRef,private dataService:ApicallService) {
    this.contractNo = this.route.snapshot.params['contractNumber'];
    this .documentidForUrl = decodeURIComponent(this.route.snapshot.params['documentid_For_Url']);
    this.report_id = route.snapshot.params['report_id'];

    const storedUnitArrayString = sessionStorage.getItem("unit_array1");
if (storedUnitArrayString) {
  this.unit = JSON.parse(storedUnitArrayString);
  this.unitArray = this.unit.map((unit: string) => ({ unit: unit, isSelected: false }));

  // Now you can use storedUnitArray as an array of strings
}
    this.apicallservice.getUnitNumbers(this.contractNo, this.documentidForUrl).subscribe((result: any) => {
      if (result) {
        console.log("&*&",result)
        // this.unit = JSON.parse(result.unit[0].unit_no);
        this.dataservice.Orderd_parts=[];
        this.dataservice.Orderd_parts = result.parts.map((item: any) => item.Parts);
        console.log("%+",this.dataservice.Orderd_parts)
        this.Description_and_Parts=result.descriptionParts;
       
        this.cdr.detectChanges();
      }
    });


  }
//   ngOnInit(){   
    
//     this.apicallservice.getChecklist_Record_Val_with_unit_checked(this.documentidForUrl,this.unit).subscribe((record_data:any)=>{
//       if (record_data)
//       {
       
//         this.dataservice.Dataservice_Record_Values=[];
//         // unit_no, description, dropdown_option, checked, img, needforReport, section
// console.log("^^a",record_data);

//         record_data.forEach((item: any) => {
//           const recordValue = {
//             checked: item.checked,
//             description: item.description,
           
//             dropdown_option: item.dropdown_option,
           
//             img: item.img,
            
//             needforReport: item.needforReport,
//             section: item.section,
//             unit_no: item.unit_no,
            
//           };
//           this.Dataservice_Record_Values_local.push(recordValue);

//         });

//         console.log("^a", this.Dataservice_Record_Values_local)
//         this.isLoading=false
      
//       }
//     });
  
    
//   }
ngOnInit() {   
  // this.isLoading = true; // Start the loader before the API call

  this.dataService.getDetailsForContractName(this.contractNo).subscribe((details: any) => {
    this.inf_26 = details;
  });

  this.apicallservice.getChecklist_Record_Val_with_unit_checked(this.documentidForUrl, this.unit)
    .subscribe((record_data: any) => {
      if (record_data) {
        this.dataservice.Dataservice_Record_Values = [];
        console.log("^^a", record_data);

        record_data.forEach((item: any) => {
          const recordValue = {
            checked: item.checked,
            description: item.description,
            dropdown_option: item.dropdown_option,
            img: item.img,
            needforReport: item.needforReport,
            section: item.section,
            unit_no: item.unit_no,
          };
          this.Dataservice_Record_Values_local.push(recordValue);
        });
        this.isLoading = false;
        console.log("^a", this.Dataservice_Record_Values_local,this.isLoading);
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Trigger change detection manually
        }, 2000);
      
      }else{
        this.isLoading = false;
      }

      // Stop the loader after the data is received
    }, error => {
      this.isLoading = false; // Stop the loader if there is an error
      console.error("Error fetching data", error);
    });
}


  counter: number = 0; // Initialize the counter

  // Reset counter before rendering the table
  resetCounter(): void {
    this.counter = 0; // Reset the counter if needed
  }

  incrementCounter(): number {
    return ++this.counter; // Increment and return the current counter value
  }

  toggleImageRecord(index: number, checked: boolean, unit: string, section: string, description: string, dropdown: string): void {
    const img = this.image_val[unit][section][description][dropdown];
    const descriptionKey = description.trim();
    const descriptionIndex = this.Record_img_Val.findIndex(item => item.description === descriptionKey);
  
    // Count currently checked units
    const count = descriptionIndex !== -1 ? this.Record_img_Val[descriptionIndex].units.filter(unitItem => unitItem.check).length : 0;
  
    if (checked) {
      // Check if already two units are selected
      if (count >= 2) {
        alert("You can only select up to two checkboxes for this row.");
        return;
      }
      this.updateUnitState(descriptionIndex, unit, true, img[0], index);
    } else {
      this.updateUnitState(descriptionIndex, unit, false, null, index);
    }
  }
  
  private updateUnitState(descriptionIndex: number, unit: string, check: boolean, imgBlob: any, index: number): void {
    if (descriptionIndex !== -1) {
      const unitIndex = this.Record_img_Val[descriptionIndex].units.findIndex(unitItem => unitItem.unit === unit);
      if (unitIndex !== -1) {
        this.Record_img_Val[descriptionIndex].units[unitIndex].check = check;
        this.Record_img_Val[descriptionIndex].units[unitIndex].img = [{ id: index, blob: imgBlob }];
      } else if (check) {
        this.Record_img_Val[descriptionIndex].units.push({ unit, check, img: [{ id: index, blob: imgBlob }] });
      }
    }
  }
  




toggleSelection(unit: { unit: string, isSelected: boolean }) {
  if (unit.isSelected) {
    // this.isDisabled = false;
    this.selectedUnits.push(unit);
  } else {
    const index = this.selectedUnits.findIndex(selectedUnit => selectedUnit.unit === unit.unit);
    if (index !== -1) {
      this.selectedUnits.splice(index, 1);
    }
  }
  
  // Check if all units are selected to update the "Select all" checkbox
  this.selectAllUnitsChecked = this.unitArray.every(unit => unit.isSelected);

  this.updateProceedButtonState();
}

toggleSelectAll() {
  this.unitArray.forEach(unit => {
    unit.isSelected = this.selectAllUnitsChecked;
  });

  // Update the selectedUnits array based on the new selection
  if (this.selectAllUnitsChecked) {
    this.selectedUnits = [...this.unitArray]; // Select all units
  } else {
    this.selectedUnits = []; // Deselect all units
  }

  this.updateProceedButtonState();
}

updateProceedButtonState() {
  this.isProceedDisabled = this.selectedUnits.length === 0;
}


getSelectedOrder(): string {
  return this.selectedOrder.join(', ');
}

getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}

downloadAllImagesAsZip(): void {
  const zip = new JSZip();  // Create a new instance of JSZip
  let count = 0;

  // Loop through the selected images and add them to the zip
  Object.keys(this.image_val).forEach(unitKey => {
    Object.keys(this.image_val[unitKey]).forEach(sectionKey => {
      Object.keys(this.image_val[unitKey][sectionKey]).forEach(descriptionKey => {
        const images = this.image_val[unitKey][sectionKey][descriptionKey];
        
        // Loop through all images for each description
        Object.keys(images).forEach((dropdownKey, index) => {
          let base64Image = images[dropdownKey];  // Get the base64 string for the image

          // Check if base64Image is an array (e.g., in some cases it may be an array of images or objects)
          if (Array.isArray(base64Image)) {
            // If it's an array, assume the first element contains the base64 string (adjust if needed)
            base64Image = base64Image[0];  // Extract the base64 string from the first element
          }

          // Check if base64Image is a valid string (base64-encoded string)
          if (typeof base64Image === 'string') {
            try {
              // Decode the base64 string into binary data
              const byteCharacters = atob(base64Image); // Decode base64 string to binary string
              const byteArray = new Uint8Array(byteCharacters.length);

              // Convert the decoded binary string to a Uint8Array
              for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
              }

              // Define the image name based on the unit, section, and description
              // Replace any slashes with underscores to prevent folder creation
              const imageName = `${unitKey}_${sectionKey}_${descriptionKey}_${dropdownKey}.jpg`.replace(/\//g, "_");

              // Add the image to the zip file
              zip.file(imageName, byteArray);
              count++;  // Increment the image count

            } catch (error) {
              console.error("Error decoding image", error);
            }
          } else {
            // If base64Image is not a string, log an error
            console.error("Invalid base64 data for image:", base64Image);
          }
        });
      });
    });
  });

  // After adding all images to the zip file, generate and download the zip file
  // zip.generateAsync({ type: 'blob' })
  //   .then((content) => {
  //     // Trigger the download of the zip file using file-saver
  //     saveAs(content, 'images.zip');
  //   })
  //   .catch((error) => {
  //     // Handle any errors during the zip file generation
  //     console.error("Error generating ZIP file", error);
  //   });
  zip.generateAsync({ type: 'blob' })
  .then((content) => {
    // Check if content is valid and not empty
    console.log('Generated ZIP file:', content);

    // Trigger download (optional, for testing)
    saveAs(content, `${this.inf_26.building_name+"-"+this.documentidForUrl}/${this.report_id}.zip`);

    // Show success message after download

    // Get the inspector name from sessionStorage
    const name = sessionStorage.getItem('UserName') || '';
    const file_name = `${this.inf_26.building_name+"-"+this.documentidForUrl}/${this.report_id}.zip`;
    // Create FormData and append file and other required fields
    const formData = new FormData();
    formData.append('file', content,`${file_name}`); // Key must match multer's 'file' field
    formData.append('inspector_name', name);

    // Append unit names if available
    if (Array.isArray(this.selectedUnits)) {
      this.selectedUnits.forEach(unitObj => {
        if (unitObj.unit) {
          formData.append('unit_name[]', unitObj.unit);
        }
      });
    }

    // Append other necessary form fields
    formData.append('document_id', this.documentidForUrl);
    formData.append('contract_no', this.contractNo);
    formData.append('project_name', this.inf_26.project_name);
    formData.append('building_name', this.inf_26.building_name);

    // Log FormData entries for debugging
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // Post the ZIP file to the server
    this.http.post(`${environment.serverUrl}report_image`, formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        alert('Images downloaded successfully');

      },
      error: (err) => {
        console.error('Error uploading file:', err);
      },
    });
  })
  .catch((error) => {
    console.error('Error generating ZIP file', error);
  });
}





// toggleSelection(unit: { unit: string; isSelected: boolean }): void {
//   unit.isSelected = !unit.isSelected; // Toggle selection

//   // Update selectedUnits array
//   if (unit.isSelected) {
//     this.selectedUnits.push(unit);
//   } else {
//     this.selectedUnits = this.selectedUnits.filter(selectedUnit => selectedUnit.unit !== unit.unit);
//   }

//   // Update "Select All" checkbox state
//   this.isAllSelected = this.unitArray.every(unit => unit.isSelected);

//   // Update disabled state of buttons
//   this.isDisabled = this.selectedUnits.length === 0;

// }



// selectAll(event: any): void {
//   // Optional: You can skip checking the "Select All" checkbox and still proceed
//   this.isAllSelected = (event.target as HTMLInputElement).checked;

//   // Set the state of each unit based on the "Select All" checkbox, but continue even if not selected
//   this.unitArray.forEach((unit) => {
//     unit.isSelected = this.isAllSelected || unit.isSelected;
//   });

//   // Update selectedUnits array based on the isSelected state
//   this.selectedUnits = this.unitArray.filter(unit => unit.isSelected);

//   // Disable button if no units are selected
//   this.isDisabled = this.selectedUnits.length === 0;
// }




// getSelectedOrder(): string {
//   return this.selectedOrder.join(', ');
// }




  // GenReport() {
  //   console.log("!@", this.Record_img_Val);
  //   this.dataservice.Report_image_Value = this.Record_img_Val;
  
  //   // Check conditions for units
  //   const descriptionsNotChecked: string[] = [];
  
  //   for (const item of this.Record_img_Val) {
  //     let checkCount = 0;
  //     let isValid = false;
      
  //     for (const unit of item.units) {
  //       if (unit.check) {
  //         checkCount++;
  //         // Check if img array length is at least 1
  //         if (unit.img.length >= 1) {
  //           isValid = true;
  //         }
  //       }
  //     }
  
  //     // Check if conditions are not met for the current item
  //     if ((checkCount < 1 || checkCount > 2) || !isValid) {
  //       descriptionsNotChecked.push(item.description);
  //     }
  //   }
  
  //   // Print descriptions of items where conditions are not met
  //   if (descriptionsNotChecked.length > 0) {
  //     console.log("Conditions for units not met for the following descriptions:");
  //     alert("Select the image for: " + descriptionsNotChecked.join(", "));
  //   }
  //    else {
  //     // Navigate to the Report_View route if all conditions are met
  //     this.router.navigate(['/Report_View', this.contractNo, this.documentidForUrl,this.report_id]);
  //   }
  // }




  GenReport() {
    if (!this.proceedClicked) {
      alert("Please click 'Proceed' before generating the report.");
      return; // Prevent generating the report if Proceed hasn't been clicked
    }

    console.log("!@", this.Record_img_Val);
    this.dataservice.Report_image_Value = this.Record_img_Val;

    // Check conditions for units
    const descriptionsNotChecked: string[] = [];

    for (const item of this.Record_img_Val) {
      let checkCount = 0;
      let isValid = false;

      for (const unit of item.units) {
        if (unit.check) {
          checkCount++;
          // Check if img array length is at least 1
          if (unit.img.length >= 1) {
            isValid = true;
          }
        }
      }

      // Check if conditions are not met for the current item
      if ((checkCount < 1 || checkCount > 2) || !isValid) {
        descriptionsNotChecked.push(item.description);
      }
    }

    // Print descriptions of items where conditions are not met
    if (descriptionsNotChecked.length > 0) {
      console.log("Conditions for units not met for the following descriptions:");
      alert("Select the image for: " + descriptionsNotChecked.join(", "));
    } else {
      // Re-enable the button before navigating
      this.isGenerateDisabled = false;
      this.router.navigate(['/Report_View', this.contractNo, this.documentidForUrl, this.report_id]);
    }
  }



  getcheck(description:any,Description:any)
  {
    return description.trim().replace(/\s+/g, '')===Description.trim().replace(/\s+/g, '')
  }
  
  
 
  // proceed() {


  //  this.isDisabled=true
   
      
  //   console.log("descri*",this.Description_and_Parts,this.selectedUnits)
   
  //   this.selectedOrder = [];
  //   // Update selectedOrder array with the currently selected units
  // this.selectedOrder = this.selectedUnits.map(selectedUnit => selectedUnit.unit);
  // if(this.selectedOrder.length == this.unit.length){
  //   if(this.selectedOrder.length>0){
  //     this.isDisabled=true
  //   this.showSecondTable = true;
  //   this.parts_for_UI=this.dataservice.Orderd_parts
  //   this.dataservice.Order_unit=this.selectedOrder;
  //   const serializedItems = JSON.stringify(this.selectedOrder);
  //   sessionStorage.setItem("Ordered_unit",serializedItems)
  //   console.log("***",this.documentidForUrl,this.selectedOrder)

  //   this.selectedOrder.forEach((unitName) => {
  //     this.Dataservice_Record_Values_local.forEach((record) => {


  //       console.log("66//",record);
  //       if (record.checked == true && unitName== record.unit_no && record.needforReport==true) { // Simplified the condition check
  //         console.log("66\\",record.description);
 
          
  //         // Initialize nested structure with arrays if not already initialized
  //         this.image_val[unitName] = this.image_val[unitName] || {};
  //         this.image_val[unitName][record.section.trim()] = this.image_val[unitName][record.section.trim()] || {};
  //         this.image_val[unitName][record.section.trim()][record.description.trim()] = this.image_val[unitName][record.section.trim()][record.description.trim()] || {};
  //         this.image_val[unitName][record.section.trim()][record.description.trim()][record.dropdown_option.trim()] = this.image_val[unitName][record.section.trim()][record.description.trim()][record.dropdown_option.trim()] || [];
    
  //         // Record_img_Val: { description: string; unit: string; img: any;checked:boolean }

  //         // const data = { unit: unitName, check: false, img: null };
  //         const description = record.description.trim();

  //         // Find the index of the description in Record_img_Val, if it exists
  //         const descriptionIndex = this.Record_img_Val.findIndex(item => item.description === description);

  //         if (descriptionIndex === -1) {          
  //           // If the description does not exist, create a new object and push it into Record_img_Val
  //           const newData = { description: description, units: [{ unit: unitName, check: false, img: [{id:-1,blob:null}] }] };
  //           this.Record_img_Val.push(newData);
  //         } else {
  //             // If the description exists, check if the unit already exists in the units array
  //             const unitIndex = this.Record_img_Val[descriptionIndex].units.findIndex(unitItem => unitItem.unit === unitName);
  //             if (unitIndex === -1) {          
  //            // If the unit does not exist, initialize img as null
  //            this.Record_img_Val[descriptionIndex].units.push({ unit: unitName, check: false, img: [{id:-1,blob:null}] });
  //             } else {
  //                 // If the unit already exists, initialize img as an empty array
  //                 this.Record_img_Val[descriptionIndex].units[unitIndex].img = [{ id: 0, blob: null }];


  //             }
  //         }

  //         // Append the new image URL to the appropriate array
  //         this.image_val[unitName][record.section.trim()][record.description.trim()][record.dropdown_option.trim()].push(record.img);
    
  //         console.log("66+", this.image_val,this.Record_img_Val);
  //       }
  //     });
  //   });
    

  //   console.log("oo",this.image_val)


   



     
  
  //     }
  //     else{
  //       alert("Select Unit")
  //     }
  //   }
  //   else{
  //     alert ("Select All Units for order")
  //   }
  //   }  



  proceed() {
    if (!this.proceedClicked) { // Check if the Proceed button was not clicked before
      this.proceedClicked = true; // Set flag to true
      this.isProceedDisabled = true; // Disable the button immediately
      this.isGenerateDisabled = false; // Enable the generate button

      console.log("descri*", this.Description_and_Parts, this.selectedUnits);

      this.selectedOrder = []; // Clear previous selection

      // Update selectedOrder array with the currently selected units
      this.selectedOrder = this.selectedUnits.map(selectedUnit => selectedUnit.unit);

      if (this.selectedOrder.length === this.unit.length) {
        if (this.selectedOrder.length > 0) {
          this.showSecondTable = true; // Show the second table
          this.parts_for_UI = this.dataservice.Orderd_parts; // Set parts for UI
          this.dataservice.Order_unit = this.selectedOrder; // Store selected order in the service

          // Store selected order in session storage
          const serializedItems = JSON.stringify(this.selectedOrder);
          sessionStorage.setItem("Ordered_unit", serializedItems);
          console.log("***", this.documentidForUrl, this.selectedOrder);

          // Loop through selected order and update Record_img_Val
          this.selectedOrder.forEach((unitName) => {
            this.Dataservice_Record_Values_local.forEach((record) => {
              console.log("66//", record);
              if (record.checked && unitName === record.unit_no && record.needforReport) {
                console.log("66\\", record.description);

                // Initialize nested structure with arrays if not already initialized
                this.image_val[unitName] = this.image_val[unitName] || {};
                this.image_val[unitName][record.section.trim()] = this.image_val[unitName][record.section.trim()] || {};
                this.image_val[unitName][record.section.trim()][record.description.trim()] = this.image_val[unitName][record.section.trim()][record.description.trim()] || {};
                this.image_val[unitName][record.section.trim()][record.description.trim()][record.dropdown_option.trim()] = this.image_val[unitName][record.section.trim()][record.description.trim()][record.dropdown_option.trim()] || [];

                const description = record.description.trim();

                // Find the index of the description in Record_img_Val, if it exists
                const descriptionIndex = this.Record_img_Val.findIndex(item => item.description === description);

                if (descriptionIndex === -1) {          
                  // If the description does not exist, create a new object and push it into Record_img_Val
                  const newData = {
                    description: description,
                    units: [{ unit: unitName, check: false, img: [{ id: -1, blob: null }] }]
                  };
                  this.Record_img_Val.push(newData);
                } else {
                  // If the description exists, check if the unit already exists in the units array
                  const unitIndex = this.Record_img_Val[descriptionIndex].units.findIndex(unitItem => unitItem.unit === unitName);
                  if (unitIndex === -1) {          
                    // If the unit does not exist, initialize img as null
                    this.Record_img_Val[descriptionIndex].units.push({ unit: unitName, check: false, img: [{ id: -1, blob: null }] });
                  } else {
                    // If the unit already exists, initialize img as an empty array
                    this.Record_img_Val[descriptionIndex].units[unitIndex].img = [{ id: 0, blob: null }];
                  }
                }

                // Append the new image URL to the appropriate array
                this.image_val[unitName][record.section.trim()][record.description.trim()][record.dropdown_option.trim()].push(record.img);
                console.log("66+", this.image_val, this.Record_img_Val);
              }
            });
          });

          console.log("oo", this.image_val);
        } else {
          alert("Select Unit");
        }
      } else {
        alert("Select All Units for order");
      }
    }
  }
  
















    pickTwo() {
      const allTables = this.myTables.toArray(); // Assuming myTables is your ViewChildren reference for all tables
      
      // Loop through each table in the array
      allTables.forEach(table => {
        // Query all rows inside the table
        const rows = Array.from(table.nativeElement.querySelectorAll('tbody tr')) as HTMLElement[]; // Explicitly cast as HTMLElement
    
        // Loop through each row to process checkboxes within that row
        rows.forEach((row: HTMLElement) => {
          // Find all checkboxes in the current row
          const allCheckboxes = Array.from(row.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[]; // Cast to HTMLInputElement[]
    
          // Filter out unchecked checkboxes in the row
          const uncheckedCheckboxes = allCheckboxes.filter((checkbox: HTMLInputElement) => !checkbox.checked);
    
          // If there is only one unchecked checkbox, check it
          if (uncheckedCheckboxes.length === 1) {
            uncheckedCheckboxes[0].checked = true;
            uncheckedCheckboxes[0].dispatchEvent(new Event('change')); // Trigger change event manually
          }
    
          // If there are at least two unchecked checkboxes, randomly select two to check
          if (uncheckedCheckboxes.length >= 2) {
            const randomIndexes = this.getRandomIndexes(uncheckedCheckboxes.length, 2);
            uncheckedCheckboxes[randomIndexes[0]].checked = true;
            uncheckedCheckboxes[randomIndexes[1]].checked = true;
    
            // Trigger the change event manually for both checkboxes
            uncheckedCheckboxes[randomIndexes[0]].dispatchEvent(new Event('change'));
            uncheckedCheckboxes[randomIndexes[1]].dispatchEvent(new Event('change'));
            this.isButtonDisabled = true;

          }
        });
      });
    }
    


    // Utility function to get random indexes
    getRandomIndexes(arrayLength: number, count: number): number[] {
      const indexes: number[] = [];
      while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * arrayLength);
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
        }
      }
      return indexes;
    }
    
    
    


  






    
}


















