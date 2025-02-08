import { Component, OnInit} from '@angular/core'; // Importación de OnInit
import { product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule , FormsModule , RouterModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'], // Corrección del nombre de la propiedad a `styleUrls`
})
export class ProductComponent implements OnInit {
  products: product[] = [];  // Lista de productos
  selectedProduct: product | null = null;  // Producto seleccionado para actualizar
  newProduct: product = { 
    id: 0, 
    code: '', 
    name: '', 
    price: 0, 
    stockQuantity: 0, 
    description: '', 
    category: '' 
  };  // Producto para crear uno nuevo



  constructor(private productService: ProductService ) {}

  ngOnInit(): void {
    this.loadProducts();  // Cargar los productos al inicializar el componente
  }

  // Método para cargar los productos
  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;  // Asignar los productos obtenidos
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);  // Manejo de errores
      },
    });
  }

  // Método para seleccionar un producto para actualizar
  selectProductToUpdate(productId: number): void {
    this.selectedProduct = this.products.find(product => product.id === productId) || null;
  }

  // Método para actualizar un producto
  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct).subscribe({
        next: (data) => {
          alert('Producto actualizado exitosamente');
          this.loadProducts();  // Recargar los productos después de la actualización
          this.selectedProduct = null;  // Limpiar el formulario
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          alert('Error al actualizar el producto');
        }
      });
    }
  }

    // Método para crear un nuevo producto
  createProduct(): void {
    // Verifica que los campos obligatorios estén completos
    if (this.newProduct.name && this.newProduct.price && this.newProduct.stockQuantity > 0) {
      this.productService.createProduct(this.newProduct).subscribe({
        next: (data) => {
          alert('Producto creado exitosamente');
          this.loadProducts();  // Recarga los productos después de la creación
          this.newProduct = { 
            id: 0, 
            code: '', 
            name: '', 
            price: 0, 
            stockQuantity: 0, 
            description: '', 
            category: '' 
          };  // Limpia el formulario
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          alert('Error al crear el producto');
        }
      });
    } else {
      alert('Por favor complete todos los campos obligatorios');
    }
  }
  
  // Método para eliminar un producto
  deleteProduct(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Producto eliminado exitosamente');
          this.loadProducts();  // Recargar los productos después de eliminar uno
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          alert('Error al eliminar el producto');
        }
      });
    } 
  }


  logId(id: number): void {
    console.log('ID del producto:', id);
  }
  
}