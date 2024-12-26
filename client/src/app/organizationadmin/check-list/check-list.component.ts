import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {
  inspections: any[] = [];
  formData: any = {};
  isFormVisible: boolean = false;
  editing: boolean = false;
  filteredInspections: any[] = []; // To store the filtered list of inspections
  searchQuery: string = ''; // Holds the search query input value

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.inspection_master();  // Fetch inspection data when component loads
  }

  // Fetch the data from the API
  inspection_master() {
    this.http.get(`${environment.serverUrl}inspection-master-list`)
      .subscribe(
        (response: any) => {
          console.log('Inspection Data:', response);
          this.inspections = response; // Assign the response data to inspections
          this.filteredInspections = response; // Initially, show all inspections
        },
        (error) => {
          console.error('Error fetching inspection data:', error);
        }
      );
  }



    // Search Items function
  searchItems() {
    if (this.searchQuery.trim() === '') {
      this.filteredInspections = this.inspections; // If search query is empty, show all items
    } else {
      // Filter by matching any of the fields (modify this as needed)
      this.filteredInspections = this.inspections.filter(item => {
        return Object.values(item).some(value => 
          (value ? value.toString().toLowerCase() : '').includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }

  // Excel download functionality
  exceldownload() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.inspections);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Checklist');
    XLSX.writeFile(wb, 'Checklist.xlsx');
  }

  // Open the form to add a new entry
  OpenEntry() {
    this.formData = {};  // Clear the form data
    this.editing = false;
    this.isFormVisible = true;
  }

  // Open the form to edit an existing entry
  openEditForm(item: any) {
    this.formData = { ...item };  // Copy the data into the form for editing
    console.log('form',this.formData);

    if (item.Emergency_Features && item.Emergency_Features.data) {
      this.formData.Emergency_Features = item.Emergency_Features.data[0]; // Extract the first value from the array
    }

    if (item.Customer_Scope && item.Customer_Scope.data) {
      this.formData.Customer_Scope = item.Customer_Scope.data[0]; // Extract the first value from the array
    }
    
    this.editing = true;
    this.isFormVisible = true;
  }

  

  // Submit the form to add or update
  submitForm(event: Event) {
    event.preventDefault();
    if (this.editing) {
      this.http.put(`${environment.serverUrl}inspection-master/${this.formData.id}`, this.formData)
   
        .subscribe(
          (response) => {
            console.log('Item updated:', response);
            this.closeForm();
            this.inspection_master();  // Reload inspections
          },
          (error) => {
            console.error('Error updating item:', error);
          }
        );
    } else {
      this.http.post(`${environment.serverUrl}inspection-master`, this.formData)
        .subscribe(
          (response) => {
            console.log('Item added:', response);
            this.closeForm();
            this.inspection_master();  // Reload inspections
          },
          (error) => {
            console.error('Error adding item:', error);
          }
        );
    }
  }

  // Close the form
  closeForm() {
    this.isFormVisible = false;
  }

  deleteItem(id: string) {
    this.http.delete(`${environment.serverUrl}inspection-master/${id}`)
      .subscribe(
        (response) => {
          console.log('Item deleted:', response);
          alert('Item deleted successfully!');  // Show success alert
          this.inspection_master();  // Reload inspections to refresh the table
        },
        (error) => {
          console.error('Error deleting item:', error);
          alert('Error deleting item');  // Show error alert
        }
      );
  }
  
}
