import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsMuestraService } from '../../services/productsmuestra.service';
import { productsmuestra } from '../../models/productsmuestra';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  products: productsmuestra[] = []; // Almacena la lista de productos
  filteredProducts: productsmuestra[] = []; // Almacena los productos filtrados
  selectedProduct: productsmuestra = this.initializeProduct(); // Inicializa el producto seleccionado
  isEdit: boolean = false; // Controla si estamos en modo de edición o creación
  
  filters = { name: '', category: '' }; // Filtros para productos

  constructor(private productsService: ProductsMuestraService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Inicializar un producto vacío
  private initializeProduct(): productsmuestra {
    return {
      id: 0,
      code: '',
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      category: '',
      imageUrl: '',
      imageLoaded: false
    };
  }

  // Método para filtrar productos
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(this.filters.name.toLowerCase());
      const matchesCategory = !this.filters.category || (product.category?.toLowerCase().includes(this.filters.category.toLowerCase()));
      return matchesName && matchesCategory;
    });
  }

  // Obtener todos los productos
  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe(
      (data: productsmuestra[]) => {
        this.products = data;
        this.filteredProducts = data; // Inicialmente, mostramos todos los productos
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  // Crear o actualizar un producto
  saveProduct(): void {
    if (this.isEdit) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  // Crear un nuevo producto
  private createProduct(): void {
    this.productsService.createProduct(this.selectedProduct).subscribe(
      (newProduct: productsmuestra) => {
        this.products.push(newProduct);
        this.resetForm();
        this.filterProducts();
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }

  // Actualizar un producto existente
  private updateProduct(): void {
    this.productsService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(
      (updatedProduct: productsmuestra) => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.resetForm();
        this.filterProducts();
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  // Eliminar un producto
  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== id);
        this.filterProducts();
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }

  // Seleccionar un producto para edición
  editProduct(product: productsmuestra): void {
    this.selectedProduct = { ...product };
    this.isEdit = true;
  }

  // Reiniciar el formulario
// Reiniciar el formulario
resetForm(): void {
  this.selectedProduct = {
    id: 0,
    code: '',
    name: '',
    description: '',
    price: 0, // Reiniciado con 0
    stockQuantity: 0, // Reiniciado con 0
    category: '', // Reiniciado al valor vacío
    imageUrl: '', // Reiniciado al valor vacío
    imageLoaded: false // Reiniciado al valor predeterminado
  };
  this.isEdit = false; // Volver al modo de creación, no de edición
}

}
