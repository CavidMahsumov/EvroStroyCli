import { Component } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from '../home/footer/footer.component';
import { ApiService } from '../../services/api-service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';

  showNotification=false;

  constructor(private http: HttpClient,private router:Router){};
  Login() {
    const loginData = {
      email: this.email.trim(),  // Trim istifadə edin, boşluqları təmizləsin
      password: this.password.trim()
    
    };


    this.http.post('http://173.214.167.131:80/api/Auth/login', loginData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        response => {
          localStorage.setItem('token', JSON.stringify(response)); // Token-i saxlayırıq
          this.showNotification = true;

          // 2 saniyədən sonra bildirişi gizlət
          setTimeout(() => {
            this.showNotification = false;
            this.router.navigate(["/home"])

          }, 2000);

        },
        error => {
          console.error('Xəta baş verdi:', error);
        }
      );
  }


}
