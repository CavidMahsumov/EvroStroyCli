import { Component, HostListener, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './ui/components/home/home.component';
import { HeaderComponent } from './ui/components/home/header/header.component';
import { FooterComponent } from './ui/components/home/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './commonService/auth-interceptor.service';
import { AuthService } from './ui/services/auth-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // Geri düyməsinə basanda logout etmək üçün istifadə edirik
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.logout();
  }

  // Reload (yeniləmə) düyməsinə basanda logout etmək üçün istifadə edirik
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: any) {
    this.logout();
  }

  // Logout funksiyası
  logout(): void {
    this.authService.logout(); // AuthService içində logout funksiyasını çağırırıq
  }
}
