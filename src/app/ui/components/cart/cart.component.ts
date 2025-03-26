import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-services.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from '../home/footer/footer.component';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string | null = null;
  totalPrice?: number;
  showNotification = false;
  isModalOpen = false; // Modal açıq/qapalı vəziyyəti
  orderData = { location: '', phoneNumber: '', notification: '' }; // Modal məlumatları

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.authService.getNameIdentifier();
    if (this.userId) {
      this.apiService.getCartItems(this.userId).subscribe(
        (response) => {
          this.cartItems = response.data.cartItems;
          // console.log(this.cartItems);
          this.totalPrice = this.cartItems.reduce(
            (sum, item) => sum + item.quantity * item.productPrice,
            0
          );
        },
        (error) => {
          console.error('Error loading cart items:', error);
        }
      );
    }
  }

  openModal() {
    this.isModalOpen = true; // Modal aç
    document.body.classList.add('modal-open'); // Scrollu bağlayır
  }

  closeModal() {
    this.isModalOpen = false; // Modal bağla
    document.body.classList.remove('modal-open'); // Scrollu açır
  }

  confirmOrder() {
    // Modalı açmaq üçün ilk addım:
    this.openModal();

    // Modalda daxil edilən məlumatları yoxlayaq:
    if (!this.orderData.location || !this.orderData.phoneNumber) {
      alert('Ünvan və telefon nömrəsi vacibdir!');
      return; // Əgər məlumatlar yoxdursa, modalda qalacaq
    }

    if (this.userId) {
      this.apiService.buyProduct(this.userId, this.orderData).subscribe({
        next: (response) => {
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
          this.router.navigate(['/home']); // Sifarişdən sonra yönləndir
          this.closeModal(); // Modalı bağla
        },
        error: (error) => {
          console.error('Sifariş zamanı xəta:', error);
        }
      });
    }
  }
  removeFromCart(cartItemId: number) {
    this.apiService.deleteItemFromCart(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.cartItemId !== cartItemId);
        this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.itemTotalPrice, 0);
      },
      error: (error) => {
        console.error('Məhsulu silmək mümkün olmadı:', error);
      }
    });
  }
  
}
