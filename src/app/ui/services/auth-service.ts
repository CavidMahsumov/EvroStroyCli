import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }
  getNameIdentifier(): string | null {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token); // JWT'yi çözümle
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    } catch (error) {
      console.error('Token çözümlenemedi:', error);
      return null;
    }
  }
}
