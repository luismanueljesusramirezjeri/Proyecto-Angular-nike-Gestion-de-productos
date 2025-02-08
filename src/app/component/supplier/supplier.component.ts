import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../services/supplier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[] = [];  // Lista de proveedores
  filteredSuppliers: Supplier[] = [];  // Lista filtrada de proveedores
  filterName: string = '';  // Valor del filtro
  selectedSupplier: Supplier = {
    id: 0,
    name: '',
    contactInfo: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    websiteUrl: ''
  };
  isEdit: boolean = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  // Obtener todos los proveedores
  getAllSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe(
      (data: Supplier[]) => {
        this.suppliers = data;
        this.filteredSuppliers = [...this.suppliers];  // Inicializa la lista filtrada
      },
      (error) => {
        console.error('Error al obtener los proveedores:', error);
      }
    );
  }

  // Filtrar proveedores por nombre
  filterSuppliers(): void {
    if (this.filterName) {
      this.filteredSuppliers = this.suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(this.filterName.toLowerCase())
      );
    } else {
      this.filteredSuppliers = [...this.suppliers];  // Si no hay filtro, mostrar todos
    }
  }

  // Crear o actualizar un proveedor
  createSupplier(): void {
    if (this.isEdit) {
      this.updateSupplier();
      return;
    }

    this.supplierService.createSupplier(this.selectedSupplier).subscribe(
      (newSupplier: Supplier) => {
        this.suppliers.push(newSupplier);
        this.filterSuppliers();  // Aplicar filtro al agregar
        this.resetForm();
      },
      (error) => {
        console.error('Error al crear el proveedor:', error);
      }
    );
  }

  // Actualizar un proveedor
  updateSupplier(): void {
    this.supplierService.updateSupplier(this.selectedSupplier.id, this.selectedSupplier).subscribe(
      (updatedSupplier: Supplier) => {
        const index = this.suppliers.findIndex(s => s.id === updatedSupplier.id);
        if (index !== -1) {
          this.suppliers[index] = updatedSupplier;
        }
        this.filterSuppliers();  // Aplicar filtro al actualizar
        this.resetForm();
      },
      (error) => {
        console.error('Error al actualizar el proveedor:', error);
      }
    );
  }

  // Eliminar un proveedor
  deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        this.suppliers = this.suppliers.filter(s => s.id !== id);
        this.filterSuppliers();  // Aplicar filtro al eliminar
      },
      (error) => {
        console.error('Error al eliminar el proveedor:', error);
      }
    );
  }

  // Seleccionar un proveedor para edición
  editSupplier(supplier: Supplier): void {
    this.selectedSupplier = { ...supplier };
    this.isEdit = true;
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.selectedSupplier = {
      id: 0,
      name: '',
      contactInfo: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      country: '',
      websiteUrl: ''
    };
    this.isEdit = false;
  }
}
