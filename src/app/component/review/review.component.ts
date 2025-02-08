import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];  // Lista de reseñas
  selectedReview: Review = {
    id: 0,
    rating: 0,
    comment: '',
    reviewerName: '',
    reviewerEmail: '',
    reviewTitle: '',
    helpfulVotes: 1,
    isVerified: false
  };
  isEdit: boolean = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.getAllReviews();
  }

  // Obtener todas las reseñas
  getAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      (data: Review[]) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error al obtener las reseñas:', error);
      }
    );
  }

  // Crear o actualizar una reseña
  createReview(): void {
    if (this.isEdit) {
      this.updateReview();
      return;
    }

    this.reviewService.createReview(this.selectedReview).subscribe(
      (newReview: Review) => {
        this.reviews.push(newReview);
        this.resetForm();
      },
      (error) => {
        console.error('Error al crear la reseña:', error);
      }
    );
  }

  // Actualizar una reseña
  updateReview(): void {
    this.reviewService.updateReview(this.selectedReview.id, this.selectedReview).subscribe(
      (updatedReview: Review) => {
        const index = this.reviews.findIndex(r => r.id === updatedReview.id);
        if (index !== -1) {
          this.reviews[index] = updatedReview;
        }
        this.resetForm();
      },
      (error) => {
        console.error('Error al actualizar la reseña:', error);
      }
    );
  }

  // Eliminar una reseña
  deleteReview(id: number): void {
    this.reviewService.deleteReview(id).subscribe(
      () => {
        this.reviews = this.reviews.filter(r => r.id !== id);
      },
      (error) => {
        console.error('Error al eliminar la reseña:', error);
      }
    );
  }

  // Seleccionar una reseña para edición
  editReview(review: Review): void {
    this.selectedReview = { ...review };
    this.isEdit = true;
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.selectedReview = {
      id: 0,
      rating: 0,
      comment: '',
      reviewerName: '',
      reviewerEmail: '',
      reviewTitle: '',
      helpfulVotes: 1,
      isVerified: false
    };
    this.isEdit = false;
  }
}
