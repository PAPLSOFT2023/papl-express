import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organization-department',
  templateUrl: './organization-department.component.html',
  styleUrls: ['./organization-department.component.scss'],
})
export class OrganizationDepartmentComponent implements OnInit {
  departments: any[] = [];
  private apiUrl = 'http://localhost:3000/api/organization_department';
  showForm = false;
  isEditMode = false;
  formData = { Department: '', Organization: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  // Get all departments
  getDepartments(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching department data:', error);
      }
    );
  }

  // Open the form for adding a department
  openAddForm(): void {
    this.isEditMode = false;
    this.formData = { Department: '', Organization: '' };
    this.showForm = true;
  }

  // Open the form for editing a department
  openEditForm(department: any): void {
    this.isEditMode = true;
    this.formData = { ...department };
    this.showForm = true;
  }

  // Save the form (either Add or Edit)
  saveForm(): void {
    if (this.isEditMode) {
      // Update department
      this.http.put(this.apiUrl, this.formData).subscribe(
        () => {
          this.getDepartments(); // Refresh the list
          this.showForm = false; // Close the form after saving
        },
        (error) => console.error('Error updating department:', error)
      );
    } else {
      // Add new department
      this.http.post(this.apiUrl, this.formData).subscribe(
        () => {
          this.getDepartments(); // Refresh the list
          this.showForm = false; // Close the form after saving
        },
        (error) => console.error('Error adding department:', error)
      );
    }
  }

  // Close the form
  closeForm(): void {
    this.showForm = false;
  }

  // Delete a department
  deleteDepartment(department: any): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.http.delete(this.apiUrl, { body: department }).subscribe(
        () => {
          console.log('Department deleted successfully');
          this.getDepartments(); // Refresh the list
        },
        (error) => console.error('Error deleting department:', error)
      );
    }
  }
}
