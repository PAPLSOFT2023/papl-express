import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organization-role',
  templateUrl: './organization-role.component.html',
  styleUrls: ['./organization-role.component.scss']
})
export class OrganizationRoleComponent implements OnInit {
  roles: any[] = [];
  private apiUrl = 'http://localhost:3000/api/organization_role';
  showForm = false;
  isEditMode = false;
  formData = { id: '', Role: '', Organization: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getroles();  // Fetch roles when the component is initialized
  }

  // Get all organization roles
  getroles(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.roles = data;  // Populate roles with the fetched data
      },
      (error) => {
        console.error('Error fetching roles:', error);
        alert('Error fetching roles. Please try again.');
      }
    );
  }

  // Open the form for adding a role
  openAddForm(): void {
    this.isEditMode = false;
    this.formData = { id: '', Role: '', Organization: '' }; // Reset form data
    this.showForm = true;
  }

  // Open the form for editing a role
  openEditForm(role: any): void {
    this.isEditMode = true;
    this.formData = { ...role }; // Prefill form with existing role data
    this.showForm = true;
  }

  // Save the form (either Add or Edit)
  saveForm(): void {
    if (this.isEditMode) {
      // Update role
      if (!this.formData.id) {
        console.error("ID is required for updating");
        return;
      }

      // Make PUT request to update the role
      this.http.put(this.apiUrl, this.formData).subscribe(
        () => {
          this.getroles();  // Refresh the list of roles
          this.showForm = false;  // Close the form after saving
        },
        (error) => {
          console.error('Error updating role:', error);
          alert('Error updating role. Please check your inputs.');
        }
      );
    } else {
      // Add new role
      this.http.post(this.apiUrl, this.formData).subscribe(
        () => {
          this.getroles();  // Refresh the list of roles
          this.showForm = false;  // Close the form after saving
        },
        (error) => {
          console.error('Error adding role:', error);
          alert('Error adding role. Please check your inputs.');
        }
      );
    }
  }

  // Close the form
  closeForm(): void {
    this.showForm = false;
  }

  // Delete a role
  deleterole(role: any): void {
    if (confirm('Are you sure you want to delete this role?')) {
      // Send the ID of the role to delete
      this.http.delete(this.apiUrl, { body: { id: role.id } }).subscribe(
        () => {
          console.log('Role deleted successfully');
          this.getroles();  // Refresh the list of roles
        },
        (error) => {
          console.error('Error deleting role:', error);
          alert('Error deleting role. Please try again.');
        }
      );
    }
  }
}
