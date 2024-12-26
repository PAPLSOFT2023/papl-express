import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-product-master',
  templateUrl: './sub-product-master.component.html',
  styleUrls: ['./sub-product-master.component.scss']
})
export class SubProductMasterComponent {
  products: any[] = [];
  subProducts: any[] = [];
  selectedProductId: number | null = null;
  subProductName: string = '';
  selectedSubProductId: number | null = null; // New property for editing

  private baseUrl = `${environment.serverUrl}api`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
    this.loadSubProducts();
  }

  loadProducts() {
    this.http.get(`${this.baseUrl}/product`).subscribe((data: any) => {
      this.products = data;
    });
  }

  loadSubProducts() {
    this.http.get(`${this.baseUrl}/subproduct`).subscribe((data: any) => {
      this.subProducts = data;
    });
  }

  addSubProduct() {
    const newSubProduct = {
      sub_product_name: this.subProductName,
      product_id: this.selectedProductId
    };

    this.http.post(`${this.baseUrl}/subproduct`, newSubProduct).subscribe({
      next: () => {
        this.loadSubProducts();
        this.resetForm();
      },
      error: (err) => console.error('Error adding sub-product:', err)
    });
  }

  editSubProduct(subProduct: any) {
    this.selectedSubProductId = subProduct.id; // Set the ID of the sub-product to edit
    this.subProductName = subProduct.sub_product_name; // Pre-fill the input
    this.selectedProductId = subProduct.product_id; // Set the selected product
  }

  updateSubProduct() {
    if (this.selectedSubProductId) {
      const updatedSubProduct = {
        sub_product_name: this.subProductName,
        product_id: this.selectedProductId
      };

      this.http.put(`${this.baseUrl}/subproduct/${this.selectedSubProductId}`, updatedSubProduct).subscribe({
        next: () => {
          this.loadSubProducts();
          this.resetForm();
        },
        error: (err) => console.error('Error updating sub-product:', err)
      });
    }
  }

  deleteSubProduct(subProductId: number) {
    this.http.delete(`${this.baseUrl}/subproduct/${subProductId}`).subscribe({
      next: () => this.loadSubProducts(),
      error: (err) => console.error('Error deleting sub-product:', err)
    });
  }

  resetForm() {
    this.subProductName = '';
    this.selectedProductId = null;
    this.selectedSubProductId = null; // Reset selected sub-product ID
  }

}
