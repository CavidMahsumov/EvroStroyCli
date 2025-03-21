import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../models/order.model';
import { Product } from '../../../models/product.model';
import { ApiServiceForAdmin } from '../../services/apiServiceForAdmin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  imports:[FormsModule,CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  searchQuery: string = '';  // Axtarış sorğusu
  orders: Order[] = [];      // Sifarişlər
  filteredOrders: any[] = []; // Filtrlənmiş sifarişlər

  constructor(private router: Router, private apiService: ApiServiceForAdmin) {}

  ngOnInit() {
    // API'den sifarişləri çəkmək
    this.apiService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response; // 'response' artık Order[] türünde
        this.filteredOrders = [...this.orders];  // İlk başta bütün sifarişləri göstərin
        console.log(this.filteredOrders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  // Sifarişləri filtr etmək
  filterOrders() {
    if (this.searchQuery.trim()) {
      // Sadece orderId'ye göre arama yapıyoruz
      this.filteredOrders = this.orders.filter(order =>
        order.orderId.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredOrders = this.orders;  // Eğer axtarış boşdursa, bütün sifarişləri göstər
    }
  }
  

  // Ana səhifəyə getmək
  goToHome() {
    this.router.navigate(['/admin']);
  }

  // Sifarişlər səhifəsinə getmək
  goToOrder() {
    this.router.navigate(['/admin/orders']);
  }

  // Parametrlər səhifəsinə getmək
  goToSettings() {
    this.router.navigate(['/admin/settings']);
  }
}

