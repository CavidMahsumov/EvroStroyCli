import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../ui/services/api-service';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  apicategories: Category[] = [];
  isCategoryModalOpen = false;
  isSubcategoryModalOpen = false;
  categoryForm: FormGroup;
  subcategoryForm: FormGroup;
  isEditingCategory = false;
  isEditingSubcategory = false;

  constructor(private fb: FormBuilder, private apiservice: ApiService, private router: Router) {
    // Kategoriya formunu yaradırıq
    this.categoryForm = this.fb.group({
      Name: ['', Validators.required]
    });

    // Subkategoriya formunu yaradırıq
    this.subcategoryForm = this.fb.group({
      Name: ['', Validators.required],
      CategoryId: ['', Validators.required]  // Seçilen kategoriya ID-sini tutmaq üçün əlavə olunur
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.apiservice.getCategories().subscribe(response => {
      if (response.success) {
        // API-dən gələn categoryId sahəsini id sahəsinə map edirik 
        this.apicategories = response.data.map((category:any) => ({
          id: category.categoryId, // Backend categoryId göndərir, biz isə id-ə çeviririk
          categoryName: category.categoryName,
          subCategories: category.subCategories
        }));
  
        // console.log('Mapped Categories:', this.apicategories); // Nəticəni yoxlayın
      }
    });
  }

  // Kategoriya modalını açmaq
  openAddCategoryModal() {
    this.isEditingCategory = false;
    this.categoryForm.reset();
    this.isCategoryModalOpen = true;
  }

  // Subkategoriya modalını açmaq və mövcud category-ləri göstərmək
  openAddSubcategoryModal() {
    this.isSubcategoryModalOpen = true;
    this.subcategoryForm.reset();  // Subkategoriya formunu sıfırlayırıq
  }

  // Subkategoriya əlavə etməyi saxlamaq
  saveSubcategory() {
    if (this.subcategoryForm.invalid) return;
  
    // Formdan məlumatları alırıq
    const subcategoryData = {
      Name: this.subcategoryForm.value.Name,        // API-nin gözlədiyi format: 'name'
      CategoryId: Number(this.subcategoryForm.value.CategoryId)  // API-nin gözlədiyi format: 'categoryId'
    };
  
    console.log("Göndərilən Subkategoriya:", subcategoryData);
  
    // API-ə sorğu göndəririk
    this.apiservice.addSubcategory(subcategoryData).subscribe(
      response => {
        this.isSubcategoryModalOpen = false;
        this.loadCategories();
      },
      error => {
        console.error("Subkategoriya əlavə edilərkən xəta baş verdi:", error);
      }
    );
  }
  
  

  // Kategoriya əlavə etməyi saxlamaq
  saveCategory() {
    if (this.categoryForm.invalid) return;

    const categoryData = {
      Name: this.categoryForm.value.Name
    };

    console.log("Göndərilən Kategoriya:", categoryData); // Debug üçün

    this.apiservice.addCategory(categoryData).subscribe(() => {
      this.loadCategories();
      this.isCategoryModalOpen = false;
    });
  }

  // Kategoriya və subkategoriya idarəetməsi
  goToHome() {
    this.router.navigate(['/admin']);
  }

  goToOrders() {
    this.router.navigate(["/admin/orders"]);
  }

  goToSettings() {
    this.router.navigate(["/admin/settings"]);
  }

  goToClients() {
    this.router.navigate(["/admin/customers"]);
  }

  goToProducts() {
    this.router.navigate(["/admin/products"]);
  }
  goToCategory(){
    
  }
}
