import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../../models/warehouse';
import { WarehouseService } from '../../services/warehouse.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  warehouses: Warehouse[] = [];
  filteredWarehouses: Warehouse[] = [];
  selectedWarehouse: Warehouse = {
    id: 0,
    name: '',
    location: '',
    capacity: 0, // Inicialización con 0, ya que no puede ser nulo
    status: 'active', // Estado inicial
    managerName: '', // Opcional
    managerContact: '' // Opcional
  };
  isEdit: boolean = false;

  // Filtros
  filters = {
    managerName: '',
    status: '' // Puede ser 'active' o 'inactive'
  };

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.getAllWarehouses();
  }

  // Método para filtrar los almacenes
  filterWarehouses() {
    this.filteredWarehouses = this.warehouses.filter(warehouse => {
      const matchesManagerName = warehouse.managerName && warehouse.managerName.toLowerCase().includes(this.filters.managerName.toLowerCase());
      const matchesStatus = !this.filters.status || warehouse.status === this.filters.status;
      return matchesManagerName && matchesStatus;
    });
  }
  

  // Obtener todos los almacenes
  getAllWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe(
      (data: Warehouse[]) => {
        this.warehouses = data;
        this.filteredWarehouses = data; // Inicialmente, mostramos todos los almacenes
      },
      (error) => {
        console.error('Error al obtener los almacenes:', error);
      }
    );
  }

  // Crear un nuevo almacén
  createWarehouse(): void {
    if (this.isEdit) {
      this.updateWarehouse();
      return;
    }

    this.warehouseService.createWarehouse(this.selectedWarehouse).subscribe(
      (newWarehouse: Warehouse) => {
        this.warehouses.push(newWarehouse);
        this.resetForm();
        this.filterWarehouses(); // Volver a aplicar los filtros después de crear
      },
      (error) => {
        console.error('Error al crear el almacén:', error);
      }
    );
  }

  // Actualizar un almacén
  updateWarehouse(): void {
    this.warehouseService.updateWarehouse(this.selectedWarehouse.id, this.selectedWarehouse).subscribe(
      (updatedWarehouse: Warehouse) => {
        const index = this.warehouses.findIndex(w => w.id === updatedWarehouse.id);
        if (index !== -1) {
          this.warehouses[index] = updatedWarehouse;
        }
        this.resetForm();
        this.filterWarehouses(); // Volver a aplicar los filtros después de actualizar
      },
      (error) => {
        console.error('Error al actualizar el almacén:', error);
      }
    );
  }

  // Eliminar un almacén
  deleteWarehouse(id: number): void {
    this.warehouseService.deleteWarehouse(id).subscribe(
      () => {
        this.warehouses = this.warehouses.filter(w => w.id !== id);
        this.filterWarehouses(); // Volver a aplicar los filtros después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el almacén:', error);
      }
    );
  }

  // Seleccionar un almacén para edición
  editWarehouse(warehouse: Warehouse): void {
    this.selectedWarehouse = { ...warehouse };
    this.isEdit = true;
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.selectedWarehouse = {
      id: 0,
      name: '',
      location: '',
      capacity: 0, // Reiniciado con 0
      status: 'active', // Reiniciado al valor predeterminado
      managerName: '', // Reiniciado según el modelo
      managerContact: '' // Reiniciado según el modelo
    };
    this.isEdit = false;
  }
}
