export interface productsmuestra {
    id: number;                 // Identificador único del producto (BIGINT)
    code: string;               // Código único del producto (no nulo)
    name: string;               // Nombre del producto (no nulo)
    description?: string;       // Descripción del producto (opcional)
    price: number;              // Precio del producto (no nulo)
    stockQuantity: number;      // Cantidad en stock (no nulo)
    category?: string;          // Categoría del producto (opcional)
    imageUrl?: string;          // Ruta o URL de la imagen del producto (opcional)
    imageLoaded: boolean;       // Estado de la imagen (no cargada=false, cargada=true)
  }
  