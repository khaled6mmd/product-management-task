import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ProductState } from 'src/app/store/reducers/product.reducer';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient, private store: Store<{ product: ProductState }>) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
      map((products: Product[]) => {
        // Modify each product with random Count, Purchase Date, and readyForSell
        return products.map((product: Product) => {
          const randomCount = Math.floor(Math.random() * 1000) + 1; // Random Count between 1 and 1000
          const randomPastDate = new Date(
            Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
          );
          const randomReadyForSell = Math.random() < 0.5; // 50/50 chance for true or false

          // Update the product properties
          product.count = randomCount;
          product.purchaseDate = new Date(randomPastDate).toISOString().slice(0, 10);
          product.readyForSell = randomReadyForSell;
  
          return product;
        });
      })
    );
  }
  
  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, newProduct);
  }

  updateProduct(productId: number, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, updatedProduct)
  }

  // get categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }
}
