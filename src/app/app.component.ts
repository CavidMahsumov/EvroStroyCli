import { Component, HostListener, NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
  constructor(private authService: AuthService, private router: Router) {
    // Router eventlərini dinləyirik
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Əgər əvvəlki səhifə "admin" idi və istifadəçi başqa yerə keçirsə, logout et
        if (this.isAdminPage(this.previousUrl) && !this.isAdminPage(event.url)) {
          this.logout();
        }
        this.previousUrl = event.url; // Cari URL-i yadda saxlayırıq
      }
    });
  }

  private previousUrl: string = ''; // Əvvəlki URL-i yadda saxlamaq üçün

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (this.isAdminPage(this.router.url)) {
      this.logout();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: any) {
    if (this.isAdminPage(this.router.url)) {
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout();
    sessionStorage.clear(); // Sessiyanı təmizləyir ki, yenidən login istəsin
  }

  // Admin panel URL-lərini yoxlayırıq
  private isAdminPage(url: string): boolean {
    return url.startsWith('/admin'); // "/admin" URL-lərinə uyğunlaşdırın
  }
}
