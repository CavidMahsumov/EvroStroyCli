import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from '../home/footer/footer.component';
import { CartService } from '../../services/cart-services.service';
import { Product } from '../../../models/product.model';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'] // 🛠 Səhv düzəldildi
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  quantity: number = 1;
  installments = [3, 6, 9, 12];
  showNotification = false;
  products: Product[] = [];
  user?:User;
  userId: string | null = null;
  // products = [
  //   { id: '1', name: 'NEOTEK Kabel H05VH', price: 1.40, stock: 800, image: 'https://omid.az/upload/API/e429d957871c4b4d7b86ec596f61bde3.jpg' },
  //   { id: '2', name: 'ELEKTRİK Yuvası', price: 2.90, stock: 266, image: 'https://strgimgr.umico.az/sized/840/34281-68c79d8b90c8a7dd05f36072f206d616.jpg' },
  //   { id: '3', name: 'LED Lampa', price: 4.50, stock: 150, image: 'https://omid.az/upload/API/8af69f00305b2c14ab47441509fc2f2a.jpg' },
  //   { id: '4', name: 'Panel Lampa', price: 12.99, stock: 75, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsSjZgkJh7EHlAZlElESm8DBVicv2vzBhN4w&s' }
  // ];

  constructor(private route: ActivatedRoute, private cartService: CartService,private apiService:ApiService,private authService:AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getNameIdentifier();
    console.log('Kullanıcı ID:', this.userId);
    this.apiService.getProducts().subscribe(response => {
      this.products = response.data; 
      console.log('Products loaded:', this.products);
    
      if (!Array.isArray(this.products)) {
        console.error('Error: products is not an array!', this.products);
        return;
      }
    
      const productId = this.route.snapshot.paramMap.get('id');
      console.log('Product ID from URL:', productId);
    
      this.product = this.products.find(p => p.id === productId);
      console.log('Selected Product:', this.product);
    });
    
    
    
  }

  selectInstallment(month: number) {
    console.log(`${month} aylıq kredit seçildi`);
  }

  increaseQuantity() {
    if (this.product && this.quantity <this.product.quantity) {
      this.quantity++;
    }
    
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  buyProduct() {
    if (this.product) {
      if (!this.userId) {
        console.error('Kullanıcı ID bulunamadı!');
        return;
      }
      
      if (!this.product?.id) {
        console.error('Ürün ID bulunamadı!');
        return;
      }
      console.log(this.quantity)
      
      this.apiService.addItemToCart(this.userId, this.product.id,this.quantity).subscribe({
        next: (response) => console.log('Ürün sepete eklendi!', response),
        error: (err) => console.error('Sepete eklerken hata oluştu:', err),
      });



      // 2 saniyədən sonra bildirişi gizlət
      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
      console.log(`${this.quantity} ədəd ${this.product.name} səbətə əlavə edildi!`);
      console.log(this.cartService.getCartItems());
    }

    
 
    // this.cartItems = []; // Səbəti təmizlə

  }
}
