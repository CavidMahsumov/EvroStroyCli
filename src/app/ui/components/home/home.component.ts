import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { AuthService } from '../../services/auth-service';
import { ApiService } from '../../services/api-service';
import { Product } from '../../../models/product.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-home',
  imports: [FooterComponent,HeaderComponent,BodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent implements OnInit  {
   products: Product[] = [];
   
  constructor(private authService:AuthService,private apiService:ApiService){};

  ngOnInit(){
    const user = this.authService.getNameIdentifier();
    console.log('İstifadəçi məlumatları:', user);
    this.apiService.getProducts().subscribe(response => {
      this.products = response.data; 
      console.log('Products loaded:', this.products);
    
      if (!Array.isArray(this.products)) {
        console.error('Error: products is not an array!', this.products);
        return;
      }
    
    
    });
  }
}


