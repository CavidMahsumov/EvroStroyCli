import { Component } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from "../home/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [HeaderComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showNotification=false;

  constructor(private registerService:RegisterService,private router:Router){}

  user = {
    firstname: '',
    email: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  };
  onSubmit() {
    // Qeydiyyat məlumatlarını AuthService vasitəsilə göndəririk
    this.registerService.register(this.user).subscribe(
      response => {
        this.showNotification=true;
        console.log('Qeydiyyat uğurlu oldu:', response);
        setTimeout(() => {
          this.showNotification = false;
          this.router.navigate(["/login"])
        }, 2000);
        console.log(this.showNotification)
        // Burada istifadəçini başqa səhifəyə yönləndirə bilərsiniz (məsələn, login səhifəsinə)
      },
      error => {
        console.error('Qeydiyyat xətası:', error);
      }
    );
  }
}
