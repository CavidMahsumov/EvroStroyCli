import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root' // Global service
})
export class ApiService {
  private baseUrl = 'https://narevrostroy.ddns.net:443/api'; // ASP.NET API URL-i

  constructor(private http: HttpClient) { }

  // GET request (məsələn, bütün məhsulları gətir)
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/GetAllProducts`);
  }

  // POST request (məsələn, yeni məhsul əlavə et)
  addProduct(productData: FormData): Observable<any> {
    return this.http.post('https://narevrostroy.ddns.net:443/api/product/AddProduct', productData);
  }

  // DELETE request (məsələn, məhsulu sil)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  getCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}/category/AllCategoriesWithSubcategories`)
  }
  getCategoriesWithSubcategory():Observable<any>{
    return this.http.get(`${this.baseUrl}/category/AllCategoriesWithSubcategories`)
  }

  getProductsBySubcategory(subcategoryId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/Product/GetAllProductBySubcategory/${subcategoryId}`)

  }

  getProductsByCategory( categoryId?: number): Observable<any> {
    // URL-i uyğun olaraq dəyişdirin

    return this.http.get(`${this.baseUrl}/Product/GetAllProductsByCategory/${categoryId}`)
  }

  addItemToCart(userId: string, productId: string,count:number) {
    const url = `${this.baseUrl}/Cart/AddItemToCart/${userId}?productId=${productId}&count=${count}`;
    return this.http.post(url, {}); // Boş body göndəririk
  }

  getCartItems(userId:string):Observable<any>{
    const url = `${this.baseUrl}/Cart/GetCartByUserId/${userId}`;
    return this.http.get(url,{});

  }
  buyProduct(userId:string,orderData?:any): Observable<any>{
    const url = `${this.baseUrl}/Order/CreateOrder/${userId}`;

    // Content-Type başlığını ekliyoruz
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, JSON.stringify(orderData), { headers });
  }
  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.post(`https://narevrostroy.ddns.net:443/api/Product/Update/${id}`, productData, {
      headers: { 'Content-Type': 'application/json' }
    });
    
  }



  deleteItemFromCart(itemId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/Cart/delete/${itemId}`, {}); 
  }

  

  
 
  
    // GET request (məsələn, bütün məhsulları gətir)
 
  
    getAllOrders(): Observable<Order[]> {
      return this.http.get<{ data: Order[] }>(`${this.baseUrl}/Order/AllOrders`).pipe(
        map((response: { data: Order[] }) => response.data)
      );
    }

    getAllUsers():Observable<any>{
      return this.http.get(`${this.baseUrl}/User/GetAll`);

    }
    
  }
  


