import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Global service
})
export class LoginService {
  private baseUrl = 'https://narevrostroy.ddns.net:443/api'; // ASP.NET API URL-i

  constructor(private http: HttpClient) { }

  // GET request (məsələn, bütün məhsulları gətir)
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // POST request (məsələn, yeni məhsul əlavə et)
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  // DELETE request (məsələn, məhsulu sil)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  getCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}/category/AllCategories`)
  }
}
