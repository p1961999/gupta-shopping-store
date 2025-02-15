import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.escuelajs.co/api/v1';
  private cart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  private categoryDataSubject = new BehaviorSubject<any>(null);
  apiData$ = this.categoryDataSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    this.loadCart();
   }

  private loadCart() {
    if (isPlatformBrowser(this.platformId)) {
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];
    this.cartSubject.next(this.cart);
    }
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateCart(this.cart);
  }

  getCartItems() {
    return this.cart;
  }

  updateCart(cart: any) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
    }
  }

  getProducts(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getAllProductsByCategory(categoryId: number): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/categories/${categoryId}/products`);
  }

  getCategoriesList(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  setCategoryData(data: any) {
    this.categoryDataSubject.next(data);
  }

  getProductById(productId: any): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/products/${productId}`);
  }
}
