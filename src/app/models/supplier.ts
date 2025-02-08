export interface Supplier {
    id: number;             // ID del proveedor basado en el tipo BIGINT de la base de datos
    name: string;           // Nombre del proveedor (no nulo)
    contactInfo?: string;   // Información de contacto del proveedor (opcional)
    email?: string;         // Correo electrónico del proveedor
    phoneNumber?: string;   // Número de teléfono del proveedor
    address?: string;       // Dirección del proveedor
    city?: string;          // Ciudad del proveedor
    country?: string;       // País del proveedor
    websiteUrl?: string;    // URL del sitio web del proveedor
  }
  