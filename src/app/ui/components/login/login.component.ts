import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { jwtDecode } from 'jwt-decode';
import { HeaderComponent } from "../home/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../home/footer/footer.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [HeaderComponent, CommonModule,
    FormsModule, FooterComponent]
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';
  showNotification = false;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  Login() {
    const loginData = {
      email: this.email.trim(),
      password: this.password.trim()
    };

    this.http.post('https://narevrostroy.ddns.net:443/api/Auth/login', loginData, { headers: { 'Content-Type': 'application/json' } })
      .subscribe(
        (response: any) => {
          const token = response?.token; 
          if (token) {
            this.authService.setToken(token); 
            const decodedToken: any = jwtDecode(token);
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
              if (role === 'Admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/home']); 
              }
            }, 2000);
          } else {
            console.error('Token alınmadı!');
          }
        },
        error => {
          console.error('Xəta baş verdi:', error);
        }
      );
  }
}
