import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-delete',
  imports: [CommonModule, FormsModule], // Aquí se agregan los módulos necesarios
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  selectedProduct: product = {id:0} as product; // Producto seleccionado para eliminar

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID del producto desde la ruta
    if (id) {
      this.loadProduct(id);
    }
  }

  // Cargar producto para eliminar
  loadProduct(id: number): void {
    this.productService.getAll().subscribe((products) => {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        this.selectedProduct = foundProduct;
      } else {
        alert('Producto no encontrado');
        this.router.navigate(['/producto']); // Redirigir si el producto no se encuentra
      }
    });
  }

  // Eliminar producto
  deleteProduct(): void {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: (data) => {
          console.log('Producto eliminado:', data);
          alert('Producto eliminado exitosamente');
          this.router.navigate(['/producto']); // Navegar de vuelta a la lista de productos
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          alert('Hubo un error al eliminar el producto');
        },
      });
    }
  }

  // Cancelar eliminación
  cancelDelete(): void {
    this.router.navigate(['/producto']); // Navegar de vuelta a la lista de productos
  }
}
