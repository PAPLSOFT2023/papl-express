import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profiledetail-manage',
  templateUrl: './profiledetail-manage.component.html',
  styleUrls: ['./profiledetail-manage.component.scss'],
  providers: [DatePipe]
})
export class ProfiledetailManageComponent implements OnInit {
  employee_all_data: any[] = [];  // All employee data from API
  filtered_employee_data: any[] = [];  // Filtered employee data to display
  searchTerm: string = ''; // The current search term

  isUserPopupOpen: boolean = false;
  isEditPopupOpen: boolean = false;


  employee_data = {
    NAME: '',
    PSN_NO: '',
    designation: '',
    contact_no: '',
    email_id: '',
    date_of_joining: '',
    date_of_birth: '',
    dept: '',
  };

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(
    private http: HttpClient,
    private apicallservice: ApicallService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: ApicallService,
    public datePipe: DatePipe
  ) {}


  ngOnInit(): void {
    this.fetchEmployeeDataUsers();
  }
 // Fetch all employee data from the service
 fetchEmployeeDataUsers(): void {
  this.userService.getEmployeeDataUsers().subscribe((data) => {
    this.employee_all_data = data;  // Store the fetched data
    this.filtered_employee_data = [...this.employee_all_data];  // Initially show all data
  });
}


onSearch(): void {
  const query = this.searchTerm.trim().toLowerCase(); // Clean the search term (case insensitive)

  if (query === '') {
    // If search term is empty, display all data
    this.filtered_employee_data = [...this.employee_all_data];
  } else {
    // Filter the employee data based on the search term
    this.filtered_employee_data = this.employee_all_data.filter(emp =>
      // Convert fields to strings and then check if they include the search term
      String(emp.NAME)?.toLowerCase().includes(query) ||
      String(emp.email_id)?.toLowerCase().includes(query) ||
      String(emp.PSN_NO)?.toLowerCase().includes(query) ||
      String(emp.designation)?.toLowerCase().includes(query) ||
      String(emp.contact_no)?.toLowerCase().includes(query) ||
      String(emp.dept)?.toLowerCase().includes(query)
    );
  }
}





  // Form submission logic
  onSubmit(userForm: NgForm): void {
    if (!userForm.valid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Determine if this is add or update
    if (this.isEditPopupOpen) {
      this.updateEmployeeDataUser();  // If editing, update the user data
    } else {
      this.addEmployeeDataUser();  // If adding, add the new user data
    }
  }

  // Method to add employee data
  addEmployeeDataUser(): void {
    console.log('Adding employee data:', this.employee_data);
    this.userService.addEmployeeDataUsers(this.employee_data).subscribe(
      (response) => {
        console.log('Employee data added:', response);
        alert('Employee data added successfully!');
        this.fetchEmployeeDataUsers();  // Reload data
        this.closeUserPopup();  // Close the form
      },
      (error) => {
        console.error('Error adding employee data:', error);
        alert('There was an error adding the employee data.');
      }
    );
  }

  // Method to update employee data
  updateEmployeeDataUser(): void {
    const userId = this.employee_data.PSN_NO;
    const { PSN_NO, ...updatedData } = this.employee_data;
    this.userService.updateEmployeeDataUsers(userId, updatedData).subscribe(
      (response) => {
        console.log('Employee data updated:', response);
        alert('Employee data updated successfully!');
        this.fetchEmployeeDataUsers();  // Reload data
        this.closeUserPopup();  // Close the form
      },
      (error) => {
        console.error('Error updating employee data:', error);
        alert('There was an error updating the employee data.');
      }
    );
  }

  // Method to edit employee data (opens the edit form and loads the selected user's data)
  editEmployeeDataUser(employeeData: any): void {
    this.employee_data = { ...employeeData };
    this.isEditPopupOpen = true;  // Open the edit popup
    this.isUserPopupOpen = false;  // Close the add popup
    console.log('Editing employee data:', this.employee_data);
  }


  deleteEmployeeDataUser(userId: string): void {
    this.userService.deleteEmployeeDataUsers(userId).subscribe(
      (response) => {
        console.log('Employee data deleted:', response);
        this.fetchEmployeeDataUsers();
        alert('Employee data deleted successfully!');
      },
      (error) => {
        console.error('Error deleting employee data:', error);
      }
    );
  }

  // Method to close the popup
  closeUserPopup() {
    this.isUserPopupOpen = false;
    this.isEditPopupOpen = false;
    this.resetEmployeeDataForm();
  }

  // Reset employee data form
  resetEmployeeDataForm(): void {
    this.employee_data = {
      NAME: '',
      PSN_NO: '',
      designation: '',
      contact_no: '',
      email_id: '',
      date_of_joining: '',
      date_of_birth: '',
      dept: '',
    };
  }

  // Toggle Add User Popup visibility
  toggleUserPopup(): void {
    this.isUserPopupOpen = !this.isUserPopupOpen;
    this.isEditPopupOpen = false;  // Ensure edit form is closed when adding
    if (this.isUserPopupOpen) {
      this.resetEmployeeDataForm();  // Reset form when opening add user popup
    }
  }

 

}
