import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productsmuestra } from '../models/productsmuestra';


@Injectable({
  providedIn: 'root',
})
export class ProductsMuestraService {
  private baseUrl = 'http://localhost:8081/api/v1/products'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAllProducts(): Observable<productsmuestra[]> {
    return this.http.get<productsmuestra[]>(this.baseUrl);
  }

  // Obtener un producto por su ID
  getProductById(id: number): Observable<productsmuestra> {
    return this.http.get<productsmuestra>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo producto
  createProduct(product: productsmuestra): Observable<productsmuestra> {
    return this.http.post<productsmuestra>(this.baseUrl, product);
  }

  // Actualizar un producto existente
  updateProduct(id: number, product: productsmuestra): Observable<productsmuestra> {
    return this.http.put<productsmuestra>(`${this.baseUrl}/${id}`, product);
  }

  // Eliminar un producto por su ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Buscar productos con filtros (opcional)
  searchProducts(filters: { code?: string; name?: string; category?: string; price?: number | null }): Observable<productsmuestra[]> {
    let queryParams = '';
    if (filters.code) queryParams += `code=${filters.code}&`;
    if (filters.name) queryParams += `name=${filters.name}&`;
    if (filters.category) queryParams += `category=${filters.category}&`;
    if (filters.price !== undefined) queryParams += `price=${filters.price}&`;

    return this.http.get<productsmuestra[]>(`${this.baseUrl}?${queryParams}`);
  }
}
