import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ApiService } from '../../../ui/services/api-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
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

  constructor(private apiService: ApiService, private fb: FormBuilder,private routes:Router) {
    this.productForm = this.fb.group({
   
        name: ['', Validators.required],
        description: [''],
        marka: ['', Validators.required],
        categoryId: [null, Validators.required],
        subCategoryId: [null, Validators.required],
        price: [null, [Validators.required, Validators.min(0)]],
        costPrice: [null, [Validators.required, Validators.min(0)]],
        quantity: [null, [Validators.required, Validators.min(1)]],
        saleCount: [0, [Validators.required, Validators.min(0)]],
        rating: [0, [Validators.min(0), Validators.max(5)]],
        hasStock: [true], // Əlavə etdim, başlanğıc dəyəri `true` olaraq təyin etdim
        file: [null]
   

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
          imageUrl: reader.result as string, // JSON üçün şəkili Base64 formatında saxlayırıq
          file: file // FormData üçün faylı saxlayırıq
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  saveProduct(): void {
    if (this.productForm.invalid) return;
  
    // Yeni məhsul əlavə edilirsə -> `FormData`
    if (!this.isEditing) {
      const formData = new FormData();
      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('marka', this.productForm.value.marka);
      formData.append('categoryId', this.productForm.value.categoryId);
      formData.append('subCategoryId', this.productForm.value.subCategoryId);
      formData.append('price', this.productForm.value.price);
      formData.append('costPrice', this.productForm.value.costPrice);
      formData.append('quantity', this.productForm.value.quantity);
      formData.append('saleCount', this.productForm.value.saleCount);
      formData.append('rating', this.productForm.value.rating);
      formData.append('hasStock', this.productForm.value.hasStock);
  
      if (this.productForm.value.file) {
        formData.append('file', this.productForm.value.file);
      } else {
        console.error("Şəkil faylı seçilməyib!");
        return;
      }
  
      this.apiService.addProduct(formData).subscribe(
        () => {
          this.loadProducts();
          this.isProductModalOpen = false;
        },
        (err) => console.error('Xəta baş verdi:', err)
      );
    } 
    // Məhsul yenilənirsə -> JSON formatı
    else if (this.isEditing && this.selectedProduct) {
      const productData = {
        id: this.selectedProduct.id,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        marka: this.productForm.value.marka,
        categoryId: this.productForm.value.categoryId,
        subCategoryId: this.productForm.value.subCategoryId,
        price: this.productForm.value.price,
        costPrice: this.productForm.value.costPrice,
        quantity: this.productForm.value.quantity,
        saleCount: this.productForm.value.saleCount,
        rating: this.productForm.value.rating,
        hasStock: this.productForm.value.hasStock,
        imageUrl: this.productForm.value.imageUrl, // Şəkili Base64 və ya URL kimi göndəririk
        category: {},
        subCategory: {},
        cartItems: []
      };
  
      this.apiService.updateProduct(this.selectedProduct.id, productData).subscribe(
        () => {
          this.loadProducts();
          this.isProductModalOpen = false;
        },
        (err) => console.error('Xəta baş verdi:', err)
      );
    }
  }
  
  
  
  goToHome(){
    this.routes.navigate(["/home"])
  }
}
