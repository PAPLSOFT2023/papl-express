import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {
  types: any[] = [];
  products: any[] = [];
  selectedTypeId: number | null = null;
  productName: string = '';
  updateProductName: string = '';
  isUpdating: boolean = false;
  currentProductId: number | null = null; // Track the current product being updated

  private baseUrl = `${environment.serverUrl}api`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTypes();
    this.loadProducts();
  }

  loadTypes() {
    this.http.get(`${this.baseUrl}/type`).subscribe((data: any) => {
      this.types = data;
    });
  }

  loadProducts() {
    this.http.get(`${this.baseUrl}/product`).subscribe((data: any) => {
      this.products = data;
    });
  }

  addProduct() {
    const newProduct = {
      product_name: this.productName,
      type_id: this.selectedTypeId
    };

    this.http.post(`${this.baseUrl}/product`, newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.productName = '';
        this.selectedTypeId = null;
      },
      error: (err) => console.error('Error adding product:', err)
    });
  }

  deleteProduct(productId: number) {
    this.http.delete(`${this.baseUrl}/product/${productId}`).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error deleting product:', err)
    });
  }

  setUpdateProduct(product: any) {
    this.currentProductId = product.id; // Set the current product ID
    this.updateProductName = product.product_name; // Set the product name to be updated
    this.isUpdating = true; // Show the update form
  }

  updateProduct() {
    if (this.currentProductId !== null) {
      const updatedProduct = {
        product_name: this.updateProductName,
        type_id: this.selectedTypeId // Optionally include the type ID if needed
      };
      this.http.put(`${this.baseUrl}/product/${this.currentProductId}`, updatedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelUpdate(); // Reset the update form
        },
        error: (err) => console.error('Error updating product:', err)
      });
    }
  }

  cancelUpdate() {
    this.isUpdating = false; // Hide the update form
    this.currentProductId = null; // Reset the current product ID
    this.updateProductName = ''; // Reset the input field
    this.selectedTypeId = null; // Reset the type ID
  }
}
