import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  imports: [CommonModule, FormsModule], // Aquí lo agregas
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  selectedProduct: product = {id:0} as product; // Producto seleccionado para actualizar

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

  // Cargar producto para actualizar
  loadProduct(id: number): void {
    this.productService.getAll().subscribe((products) => {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        this.selectedProduct = foundProduct;
      } else {
        alert('Producto no encontrado');
        this.router.navigate(['/producto']);
      }
    });
  }

  // Actualizar producto
  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct).subscribe({
        next: (data) => {
          console.log('Producto actualizado:', data);
          alert('Producto actualizado exitosamente');
          this.router.navigate(['/producto']); // Navegar de vuelta a la lista de productos
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
          alert('Hubo un error al actualizar el producto');
        },
      });
    }
  }

  // Cancelar actualización
  cancelUpdate(): void {
    this.router.navigate(['/producto']); // Navegar de vuelta a la lista de productos
  }
}
