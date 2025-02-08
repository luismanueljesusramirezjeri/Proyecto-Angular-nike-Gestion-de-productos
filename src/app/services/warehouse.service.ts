import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warehouse } from '../models/warehouse';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private baseUrl = 'http://localhost:8081/api/v1/warehouse'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los almacenes
  getAllWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.baseUrl);
  }

  // Obtener un almacén por su ID
  getWarehouseById(id: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo almacén
  createWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(this.baseUrl, warehouse);
  }

  // Actualizar un almacén existente
  updateWarehouse(id: number, warehouse: Warehouse): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.baseUrl}/${id}`, warehouse);
  }

  // Eliminar un almacén por su ID
  deleteWarehouse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Buscar almacenes con filtros (opcional)
  searchWarehouses(filters: { name?: string; location?: string; status?: 'active' | 'inactive'; capacity?: number | null }): Observable<Warehouse[]> {
    // Aquí puedes construir una URL con parámetros de búsqueda
    let queryParams = '';
    if (filters.name) queryParams += `name=${filters.name}&`;
    if (filters.location) queryParams += `location=${filters.location}&`;
    if (filters.status) queryParams += `status=${filters.status}&`;
    if (filters.capacity !== undefined) queryParams += `capacity=${filters.capacity}&`;

    return this.http.get<Warehouse[]>(`${this.baseUrl}?${queryParams}`);
  }
}
