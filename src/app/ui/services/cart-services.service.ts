import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {
    this.loadCart(); // Səhifə açılan kimi cart məlumatlarını localStorage-dan götür
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  addToCart(product: any, quantity: number = 1) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }
    this.saveCart(); // Yenilənmiş səbəti yadda saxla
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCart();
  }

  increaseQuantity(productId: string) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(productId: string) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }


  
}
