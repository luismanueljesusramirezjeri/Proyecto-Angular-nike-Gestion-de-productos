export interface Warehouse {
  id: number;               // Identificador único del almacén, tipo BIGINT en la base de datos
  name: string;             // Nombre del almacén (no nulo)
  location: string;         // Ubicación del almacén (no nulo)
  capacity: number;         // Capacidad del almacén (no nulo)
  status: 'active' | 'inactive'; // Estado del almacén, debe ser 'active' o 'inactive'
  managerName?: string;     // Nombre del encargado del almacén (opcional)
  managerContact?: string;  // Contacto del encargado (opcional)
}
