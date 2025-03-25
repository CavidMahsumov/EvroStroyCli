import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../../ui/services/api-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

  ngOnInit(): void {
    console.log('ApiService:', this.apiService); 

    this.apiService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Users:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
