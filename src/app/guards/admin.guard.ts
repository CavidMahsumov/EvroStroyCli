import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../ui/services/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    localStorage.removeItem('userId'); // userId silinsin ki, həmişə yeni yoxlama aparsın

    const role = this.authService.getUserRole();

    if (role !== 'Admin') {
      this.router.navigate(['/home']); // Əgər admin deyilsə, home səhifəsinə göndər
      return false;
    }
    return true;
  }
}
