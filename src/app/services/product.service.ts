import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product, ProductFullDetails } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'http://localhost:8081/api/v1/product';

  constructor(private httpClient: HttpClient) {}

  // Método para obtener todos los productos desde la API
  getAll(): Observable<product[]> {
    return this.httpClient.get<product[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar un producto por ID
  updateProduct(product: product): Observable<product> {
    return this.httpClient.put<product>(`${this.apiURL}/${product.id}`, product).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear un nuevo producto
  createProduct(product: product): Observable<product> {
    return this.httpClient.post<product>(this.apiURL, product).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar un producto por ID
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.httpClient.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }


  // Método para obtener detalles completos de un producto
  getProductFullDetails(id: number): Observable<ProductFullDetails> {
    return this.httpClient.get<ProductFullDetails>(`${this.apiURL}/full/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    let errorMessage = 'Ocurrió un error al realizar la solicitud';
    if (error.error instanceof ErrorEvent) {
      // Error en el lado del cliente
      errorMessage = `Error en el cliente: ${error.error.message}`;
    } else {
      // Error en el lado del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
