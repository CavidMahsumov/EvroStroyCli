import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceForAdmin } from '../../services/apiServiceForAdmin';
import { Order } from '../../../models/order.model';
import { Product } from '../../../models/product.model';
import { ApiService } from '../../../ui/services/api-service';

@Component({
  selector: 'app-admin-home',
  imports:[CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  orderCount: number = 120;
  revenue?: number 
  productCount: number = 250;
  orders?:Order[];
  products?:Product[];
  lowStockProducts?:Product[]
constructor(private router:Router,private apiService:ApiService){}

 ngOnInit(){
  this.apiService.getAllOrders().subscribe({
    next: (response) => {
      this.orders = response; // 'response' artık Order[] türünde
      this.calculateTotalRevenue();
      
      if (this.orders.length > 0) {
        console.log('Price:', this.orders[0].totalAmount);
      } else {
        console.log('Orders list is empty.');
      }
    },
    error: (error) => {
      console.error('Error fetching orders:', error);
    }
  });
  
  this.apiService.getProducts().subscribe({
    next: (response) => {
      this.products = response.data ?? []; // 'response' artık Product[] türünde
      this.lowStockProducts = this.products?.filter((product:Product) => product.quantity < 10);
      console.log('Total products:', this.lowStockProducts);
    },
    error: (error) => {
      console.error('Error fetching products:', error);
    }
  });


  
 }
  lastOrders = [
    { id: 201, amount: 500, date: '01.01.2025' },
    { id: 202, amount: 200, date: '02.01.2025' },
    { id: 203, amount: 300, date: '02.01.2025' }
  ];
 

  filterData(type: string) {
    if (type === 'daily') {
      this.orderCount = 120;
      this.revenue = 5000;
    } else if (type === 'weekly') {
      this.orderCount = 750;
      this.revenue = 35000;
    } else if (type === 'monthly') {
      this.orderCount = 3000;
      this.revenue = 150000;
    }
  }

  calculateTotalRevenue() {
    this.revenue = this.orders?.reduce((sum, order) => sum + order.totalAmount, 0);
    console.log('Total Revenue:', this.revenue);
  }
  goToProducts(){
    this.router.navigate(["/admin/products"])
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
}
