export interface Review {
  id: number;                    // Identificador único de la reseña
  rating: number;                 // Calificación entre 1 y 5
  comment?: string;               // Comentario opcional
  reviewerName?: string;          // Nombre del revisor
  reviewerEmail?: string;         // Correo electrónico del revisor
  reviewTitle?: string;           // Título de la reseña
  helpfulVotes?: number;          // Votos útiles
  isVerified?: boolean;           // Indica si la reseña está verificada
}
