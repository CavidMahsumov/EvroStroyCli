import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private router: Router) {}

  // Tokeni sessionStorage-da saxlamaq daha etibarlı olar
  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token); // Tokeni sessionStorage-da saxla
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey); // Tokeni sessionStorage-dan al
  }

  getNameIdentifier(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    } catch (error) {
      console.error('Token çözümlenemedi:', error);
      return null;
    }
  }
  logout(): void {
    sessionStorage.clear();  // SessionStorage-ı təmizləyirik
    localStorage.clear(); // LocalStorage-ı təmizləyirik
    this.router.navigate(['/login']); // İstifadəçini login səhifəsinə yönləndiririk
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (error) {
      console.error('Token çözümlenemedi:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Token varsa, autentikasiya edilmiş sayılır
  }
}
