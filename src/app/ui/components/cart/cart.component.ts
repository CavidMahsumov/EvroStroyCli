import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-services.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from '../home/footer/footer.component';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports:[CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string | null = null;
  totalPrice?:number;
  showNotification = false;



  constructor(private cartService: CartService,private apiService:ApiService,private authService:AuthService,private router:Router) {}

  ngOnInit() {
    this.userId = this.authService.getNameIdentifier();
    console.log(this.userId);
    if(this.userId!=null){

      this.apiService.getCartItems(this.userId).subscribe(
        (response) => {
          this.cartItems = response.data.cartItems; // `data` array-i çıxarılır
          this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.quantity * item.productPrice), 0);

          console.log(this.cartItems);

        },
        (error) => {
          console.error('Error loading cart items:', error);
        }
      );
    }
    
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item.id);
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item.id);
  }

  removeFromCart(item: any) {
    
    // this.cartService.removeFromCart(item.id);
    // this.cartItems = this.cartService.getCartItems(); // Yenilənmiş səbəti götür
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  checkout() {
     // Kullanıcı ID
    const orderData = {
      location: 'Istanbul, Turkey',
      phoneNumber: '+905551112233',
      notification: 'Please deliver between 10 AM - 12 PM'
    };
    if(this.userId)
    this.apiService.buyProduct(this.userId, orderData).subscribe({
      next: (response) => {
        this.showNotification = true;

      // 2 saniyədən sonra bildirişi gizlət
      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
        console.log('Order created successfully:', response);
        this.router.navigate(['/home'])
        
      },
      error: (error) => {
        console.error('Error creating order:', error);
        console.error('Validation Errors:', error.error?.errors);
      }
    });

    // this.apiService.addItemToCart(userId, productId).subscribe({
    //   next: response => console.log('Item added to cart!', response),
    //   error: err => console.error('Error adding to cart:', err)
    // });
    // this.cartItems = []; // Səbəti təmizlə// order
  }
}
