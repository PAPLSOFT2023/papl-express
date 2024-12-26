import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-last-sub-product-master',
  templateUrl: './last-sub-product-master.component.html',
  styleUrls: ['./last-sub-product-master.component.scss']
})
export class LastSubProductMasterComponent {
  subProducts: any[] = [];
  lastSubProducts: any[] = [];
  lastSubProductName: string = '';
  selectedSubProductId: number | null = null;
  updateLastSubProductName: string = ''; // For updating last sub-product
  selectedUpdateSubProductId: number | null = null; // ID of the selected sub-product for updating
  selectedLastSubProductId: number | null = null; // ID of the selected last sub-product for updating
  isUpdating: boolean = false; // Flag to check if we are in update mode

  private baseUrl = `${environment.serverUrl}api`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSubProducts();
    this.loadLastSubProducts();
  }

  loadSubProducts() {
    this.http.get(`${this.baseUrl}/subproduct`).subscribe((data: any) => {
      this.subProducts = data;
    });
  }

  loadLastSubProducts() {
    this.http.get(`${this.baseUrl}/lastsubproduct`).subscribe((data: any) => {
      this.lastSubProducts = data;
    });
  }

  addLastSubProduct() {
    const newLastSubProduct = {
      last_sub_product_name: this.lastSubProductName,
      sub_product_id: this.selectedSubProductId
    };

    this.http.post(`${this.baseUrl}/lastsubproduct`, newLastSubProduct).subscribe({
      next: () => {
        this.loadLastSubProducts();
        this.resetForm();
      },
      error: (err) => console.error('Error adding last sub-product:', err)
    });
  }

  setUpdateLastSubProduct(lastSubProduct: any) {
    this.selectedLastSubProductId = lastSubProduct.id;
    this.updateLastSubProductName = lastSubProduct.last_sub_product_name;
    this.selectedUpdateSubProductId = lastSubProduct.sub_product_id; // Pre-select the current sub-product ID
    this.isUpdating = true; // Set to true to show the update form
  }

  updateLastSubProduct() {
    const updatedLastSubProduct = {
      last_sub_product_name: this.updateLastSubProductName,
      sub_product_id: this.selectedUpdateSubProductId // Use the selected sub-product ID for updating
    };

    this.http.put(`${this.baseUrl}/lastsubproduct/${this.selectedLastSubProductId}`, updatedLastSubProduct).subscribe({
      next: () => {
        this.loadLastSubProducts();
        this.resetUpdateForm();
      },
      error: (err) => console.error('Error updating last sub-product:', err)
    });
  }

  deleteLastSubProduct(lastSubProductId: number) {
    this.http.delete(`${this.baseUrl}/lastsubproduct/${lastSubProductId}`).subscribe({
      next: () => this.loadLastSubProducts(),
      error: (err) => console.error('Error deleting last sub-product:', err)
    });
  }

  cancelUpdate() {
    this.resetUpdateForm(); // Reset the update form and close it
  }

  resetForm() {
    this.lastSubProductName = '';
    this.selectedSubProductId = null; // Reset selected product ID
  }

  resetUpdateForm() {
    this.updateLastSubProductName = '';
    this.selectedLastSubProductId = null; // Clear the selected last sub-product ID
    this.selectedUpdateSubProductId = null; // Clear selected sub-product ID for update
    this.isUpdating = false; // Hide the update form
  }
}
