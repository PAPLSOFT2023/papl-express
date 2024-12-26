import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organization-master',
  templateUrl: './organization-master.component.html',
  styleUrls: ['./organization-master.component.scss']
})
export class OrganizationMasterComponent {
  organizations: any[] = [];
  organizationName: string = '';
  updateOrganizationName: string = '';
  isUpdating: boolean = false;
  currentOrgId: number | null = null; // To hold the current organization ID being updated
  private baseUrl = `${environment.serverUrl}api`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.http.get(`${this.baseUrl}/organization`).subscribe((data: any) => {
      this.organizations = data;
      console.log('organizations', this.organizations);
    });
  }

  addOrganization() {
    const newOrg = { organization_name: this.organizationName };
    this.http.post(`${this.baseUrl}/organization`, newOrg).subscribe({
      next: () => {
        this.loadOrganizations();
        this.organizationName = '';
      },
      error: (err) => console.error('Error adding organization:', err)
    });
  }

  setUpdateOrganization(org: any) {
    this.currentOrgId = org.id; // Set the current organization ID
    this.updateOrganizationName = org.organization_name; // Set the organization name to be updated
    this.isUpdating = true; // Show the update form
  }

  updateOrganization() {
    if (this.currentOrgId !== null) {
      const updatedOrg = { organization_name: this.updateOrganizationName };
      this.http.put(`${this.baseUrl}/organization/${this.currentOrgId}`, updatedOrg).subscribe({
        next: () => {
          this.loadOrganizations();
          this.cancelUpdate(); // Reset the update form
        },
        error: (err) => console.error('Error updating organization:', err)
      });
    }
  }

  cancelUpdate() {
    this.isUpdating = false; // Hide the update form
    this.currentOrgId = null; // Reset the current organization ID
    this.updateOrganizationName = ''; // Reset the input field
  }

  deleteOrganization(orgId: number) {
    this.http.delete(`${this.baseUrl}/organization/${orgId}`).subscribe({
      next: () => this.loadOrganizations(),
      error: (err) => console.error('Error deleting organization:', err)
    });
  }
}
