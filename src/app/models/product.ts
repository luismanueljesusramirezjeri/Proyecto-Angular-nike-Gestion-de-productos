import { Review } from "./review";
import { Supplier } from "./supplier";
import { Warehouse } from "./warehouse";

export interface product{
    id: number;              // Tipo de id basado en el tipo Long de Java
    code: string;            // Código del producto (único y no nulo)
    name: string;            // Nombre del producto (no nulo)
    description?: string;    // Descripción del producto (opcional)
    price: number;           // Precio del producto (no nulo)
    stockQuantity: number;   // Cantidad de stock (no nulo)
    category?: string;       // Categoría del producto (opcional)
}


//  SIRVE PARA LAS RELACION ENTRE TABLAS 
//  SIRVE PARA LAS RELACION ENTRE TABLAS 
// Relación de producto con proveedores
export interface ProductWithSuppliers extends product {
    suppliers: Supplier[];   // Lista de proveedores asociados al producto
  }
  
  // Relación de producto con reseñas
  export interface ProductWithReviews extends product {
    reviews: Review[];       // Lista de reseñas asociadas al producto
  }
  
  // Relación de producto con almacenes
  export interface ProductWithWarehouse extends product {
    warehouse: Warehouse[];  // Lista de almacenes asociados al producto
  }

export interface ProductFullDetails extends product{
    suppliers: Supplier[];
    review: Review[];
    warehouse:Warehouse;
}