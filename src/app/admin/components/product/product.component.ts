import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ApiService } from '../../../ui/services/api-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: any[] = [];
  searchQuery: string = '';
  isProductModalOpen: boolean = false;
  isEditing: boolean = false;
  productForm: FormGroup;
  selectedProduct: Product | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      marka: ['', Validators.required],
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      costPrice: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      saleCount: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      hasStock: [true],
      file: [null],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(response => {
      this.products = response.data;
      this.filteredProducts = response.data;
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      p.id.toString() === this.searchQuery
    );
  }

  openAddProductModal(): void {
    this.isEditing = false;
    this.productForm.reset();
    this.isProductModalOpen = true;
  }

  openEditProductModal(product: Product): void {
    this.isEditing = true;
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.isProductModalOpen = true;
  }

  deleteProduct(id: number): void {
    if (confirm('Bu məhsulu silmək istədiyinizə əminsiniz?')) {
      this.apiService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({
          imageUrl: reader.result as string,
          file: file
        });
      };
      reader.readAsDataURL(file);
    }
  }
  saveProduct(): void {
    if (this.productForm.invalid) return;
  
    const productData: any = {
      ...this.productForm.value,
      cartItems: this.selectedProduct?.cartItems || [] // Default boş array göndəririk
    };
  
    // Yalnız categoryId və subCategoryId ilə id göndəririk
    productData.category = this.productForm.value.categoryId ? { id: this.productForm.value.categoryId } : { id: 0 }; // Default ID 0
    productData.subCategory = this.productForm.value.subCategoryId ? { id: this.productForm.value.subCategoryId } : { id: 0 }; // Default ID 0
  
    // Məhsulun yeni olduğunu yoxlayaq
    if (!this.isEditing) {
      this.apiService.addProduct(productData).subscribe(
        () => {
          this.loadProducts();
          this.closeModal();
        },
        (err) => console.error('Xəta baş verdi:', err)
      );
    } else if (this.isEditing && this.selectedProduct) {
      this.apiService.updateProduct(this.selectedProduct.id, productData).subscribe(
        () => {
          this.loadProducts();
          this.closeModal();
        },
        (err) => console.error('Xəta baş verdi:', err)
      );
    }
  }
  
  
  
  goToHome() {
    this.router.navigate(['/admin']);
  }

  goToOrders(){
    this.router.navigate(["/admin/orders"])

  }
  goToSettings(){
    this.router.navigate(["/admin/settings"])
  }
  goToClients(){
    this.router.navigate(["/admin/customers"])
  }

  closeModal() {
    this.isProductModalOpen = false;
    this.selectedProduct = null;
  }

}