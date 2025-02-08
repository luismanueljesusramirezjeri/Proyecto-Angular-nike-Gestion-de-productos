import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Servicio de productos
import { product } from '../../models/product'; // Modelo de producto
import { Router } from '@angular/router'; // Necesario para redirigir al usuario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  // Inicializamos el nuevo producto con todos los campos posibles
  newProduct: product = {
    id: 0,
    code: '', // Campo requerido
    name: '', // Campo requerido
    description: '', // Opcional
    price: 0, // Campo requerido
    stockQuantity: 0, // Campo requerido
    category: '' // Opcional
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router // Inyectamos el Router para manejar la redirección
  ) {}

  // Método para validar los campos requeridos
  isFormValid(): boolean {
    return (
      this.newProduct.code.trim() !== '' && // Verifica que el código no esté vacío
      this.newProduct.name.trim() !== '' && // Verifica que el nombre no esté vacío
      this.newProduct.price > 0 && // Verifica que el precio sea mayor a 0
      this.newProduct.stockQuantity > 0 // Verifica que la cantidad en stock sea mayor a 0
    );
  }

  // Método para crear el producto
  createProduct() {
    // Verificar si los datos son válidos
    if (this.isFormValid()) {
      this.productService.createProduct(this.newProduct).subscribe(
        (createdProduct) => {
          if (createdProduct) {
            this.successMessage = 'Producto creado exitosamente!';
            this.errorMessage = ''; // Limpiar el mensaje de error si la creación es exitosa
            console.log('Producto creado:', createdProduct);
            // Aquí podrías hacer algo más, como redirigir o mostrar un mensaje de éxito
          } else {
            this.errorMessage = 'Error al crear el producto.';
            this.successMessage = ''; // Limpiar el mensaje de éxito en caso de error
            console.error('Error al crear el producto.');
          }
        },
        (error) => {
          this.errorMessage = 'Error al crear el producto: ' + error.message;
          this.successMessage = ''; // Limpiar el mensaje de éxito en caso de error
          console.error('Error al crear el producto:', error);
        }
      );
    } else {
      this.errorMessage = 'Faltan datos necesarios para crear el producto.';
      this.successMessage = ''; // Limpiar el mensaje de éxito si faltan datos
    }
  }

  // Método para cancelar y limpiar el formulario
  cancel() {
    // Limpiar el formulario
    this.newProduct = {
      id: 0,
      code: '',
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      category: ''
    };

    // Redirigir al usuario a la lista de productos
    this.router.navigate(['/producto']);
  }
}
