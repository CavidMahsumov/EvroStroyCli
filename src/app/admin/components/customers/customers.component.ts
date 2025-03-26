import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../../ui/services/api-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true, 
  imports: [CommonModule, HttpClientModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  users: any[] = [];

  private apiService = inject(ApiService); 
  constructor(private router:Router){};

  ngOnInit(): void {
    console.log('ApiService:', this.apiService); 

    this.apiService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        // console.log('Users:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  goToHome() {
    this.router.navigate(['/admin']);
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
  goToProducts(){
    this.router.navigate(["/admin/products"])
  }

}
