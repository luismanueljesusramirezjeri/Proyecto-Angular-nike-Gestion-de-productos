import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { ProductUpdateComponent } from './component/product-update/product-update.component';
import { ReviewComponent } from './component/review/review.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { WarehouseComponent } from './component/warehouse/warehouse.component';
import { ProductCreateComponent } from './component/product-create/product-create.component';
import { AppComponent } from './app.component';
import { ProductDeleteComponent } from './component/product-delete/product-delete.component';
import { InicioGestionComponent } from './component/inicio-gestion/inicio-gestion.component';





export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta vacía a /inicio
    { path: 'inicio', component: InicioComponent }, // Ruta para el componente Inicio

  // Nuevas rutas  agregadas arriba esta la principal
  // Nuevas rutas  agregadas arriba esta la principal
  { path: 'producto', component: ProductComponent }, // Página para ver productos
  { path: 'update-product/:id', component: ProductUpdateComponent },  // Ruta para actualizar producto
  { path: 'producto/create', component: ProductCreateComponent},
  { path: 'producto-delete/:id', component: ProductDeleteComponent},

  // Agregar ruta para reseñas
  { path: 'reseñas', component: ReviewComponent }, // Ruta para ver, crear y gestionar reseñas

  // Agregar ruta para proveedores
  { path: 'proveedores', component: SupplierComponent}, // Ruta para ver , crear  y gestinar proveedores

  // Agregar ruta para Gestión de Almacenes
  { path: 'GestionAlmacenes' , component: WarehouseComponent}, // Ruta para ver , crear y gestionar Gestión de Almacenes

  // RUTA para gestionar los productos y configurarlo y agregarlo   y todo sera mostrado en inicio solo productos
  { path: 'GestionProductos' , component: InicioGestionComponent}  // Ruta para Gestionar los productos 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
