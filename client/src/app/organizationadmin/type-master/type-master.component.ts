import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-type-master',
  templateUrl: './type-master.component.html',
  styleUrls: ['./type-master.component.scss']
})
export class TypeMasterComponent {
  organizations: any[] = [];
  types: any[] = [];
  selectedOrganizationId: number | null = null;
  typeName: string = '';
  updateTypeName: string = '';
  isUpdating: boolean = false;
  currentTypeId: number | null = null; // Track the current type being updated

  private baseUrl = `${environment.serverUrl}api`;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadOrganizations();
    this.loadTypes();
  }

  loadOrganizations() {
    this.http.get(`${this.baseUrl}/organization`).subscribe((data: any) => {
      this.organizations = data;
    });
  }

  loadTypes() {
    this.http.get(`${this.baseUrl}/type`).subscribe((data: any) => {
      this.types = data;
    });
  }

  addType() {
    const newType = {
      type_name: this.typeName,
      organization_id: this.selectedOrganizationId
    };

    this.http.post(`${this.baseUrl}/type`, newType).subscribe({
      next: () => {
        this.loadTypes();
        this.typeName = '';
        this.selectedOrganizationId = null;
      },
      error: (err) => console.error('Error adding type:', err)
    });
  }

  deleteType(typeId: number) {
    this.http.delete(`${this.baseUrl}/type/${typeId}`).subscribe({
      next: () => this.loadTypes(),
      error: (err) => console.error('Error deleting type:', err)
    });
  }

  setUpdateType(type: any) {
    this.currentTypeId = type.id; // Set the current type ID
    this.updateTypeName = type.type_name; // Set the type name to be updated
    this.isUpdating = true; // Show the update form
  }

  updateType() {
    if (this.currentTypeId !== null) {
      const updatedType = {
        type_name: this.updateTypeName,
        organization_id: this.selectedOrganizationId
      };
      this.http.put(`${this.baseUrl}/type/${this.currentTypeId}`, updatedType).subscribe({
        next: () => {
          this.loadTypes();
          this.cancelUpdate(); // Reset the update form
        },
        error: (err) => console.error('Error updating type:', err)
      });
    }
  }

  cancelUpdate() {
    this.isUpdating = false; // Hide the update form
    this.currentTypeId = null; // Reset the current type ID
    this.updateTypeName = ''; // Reset the input field
  }

}
