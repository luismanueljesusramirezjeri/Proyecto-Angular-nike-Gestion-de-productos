import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private baseUrl = 'http://localhost:8081/api/v1/supplier'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los proveedores
  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl);
  }

  // Obtener un proveedor por ID
  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo proveedor
  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.baseUrl, supplier);
  }

  // Actualizar un proveedor
  updateSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/${id}`, supplier);
  }

  // Eliminar un proveedor
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
