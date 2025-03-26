import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from "../home/header/header.component";
import { FooterComponent } from "../home/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.scss'],
  imports: [HeaderComponent, FooterComponent,CommonModule,RouterModule]
})
export class CatalogDetailComponent implements OnInit {
  apicategories: Category[] = [];
  selectedCategory: Category | null = null;
  selectedSubCategory: any = null;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getCategories().subscribe(response => {
      if (response.success) {
        // Process the categories
        this.apicategories = response.data.map((category: any) => ({
          id: category.categoryId,
          categoryName: category.categoryName,
          subCategories: category.subCategories || [],
          open: false
        }));
        // console.log(this.apicategories[0].subCategories[0].subcategoryId);
      }
    });

    // Handle the category and subcategory selection from the URL parameters
    this.route.paramMap.subscribe(params => {
      const categoryId = Number(params.get('id'));
      const subCategoryId = Number(params.get('subId'));

      this.apiService.getProductsByCategory(categoryId).subscribe(response => {
        if (response.success) {
          this.products = response.data;
        }
      });
      

      if (!isNaN(categoryId)) {
        this.selectedCategory = this.apicategories.find(cat => cat.id === categoryId) || null;
        if (this.selectedCategory) {
          this.filterProductsByCategoryOrSubcategory(categoryId, subCategoryId);
        }
      }
    });
  }

  filterProductsByCategoryOrSubcategory(categoryId: number, subcategoryId: number,subcategoryName?:string): void {
    if (categoryId) {
      this.apiService.getProductsByCategory(categoryId).subscribe(response => {
        if (response.success) {
          if(subcategoryName!=null){
          this.products = response.data.filter((product: Product) =>product.subCategoryName==subcategoryName);
          }
          else{
            this.products=response.data;
          }
        }
      });
    }
    // if (subCategoryId) {
    //   this.apiService.getProductsBySubcategory(subCategoryId).subscribe(response => {
    //     if (response.success) {
    //       this.products = response.data;
    //     }
    //   });
    // } else {
    //   this.apiService.getProductsByCategory(categoryId).subscribe(response => {
    //     if (response.success) {
    //       this.products = response.data;
    //     }
    //   });
    // }
  }

  goToProductDetail(product: Product): void {
    this.router.navigate(['/product-detail',product.id]);
  }

  toggleCategory(category: Category): void {
    category.open = !category.open;
    this.apiService.getProductsByCategory(category.id).subscribe(response => {
      if (response.success) {
        this.products = response.data;
      }
    });

  }

  selectSubCategory(subCategoryId: number): void {
    this.selectedSubCategory = subCategoryId;
    if (this.selectedCategory) {
      this.filterProductsByCategoryOrSubcategory(this.selectedCategory.id, subCategoryId);
    }
  }
}
