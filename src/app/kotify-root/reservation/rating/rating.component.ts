import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { ReservationService } from '../../../core/services/reservation.service';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, StarRatingComponent],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  private router = inject(Router);
  private reservationService = inject(ReservationService);

  /** Alimentado automáticamente desde /reservations/:reservationId/rating. */
  reservationId = input.required<string>();

  reservation = computed(() =>
    this.reservationService.getReservationById(this.reservationId())
  );

  overall = 0;
  food = 0;
  service = 0;
  punctuality = 0;
  comment = '';

  get canSubmit(): boolean {
    return this.overall > 0;
  }

  goBack(): void {
    this.router.navigate(['/reservations', this.reservationId()]);
  }

  submit(): void {
    if (!this.canSubmit) return;
    this.reservationService.submitRating(this.reservationId(), {
      overall: this.overall,
      food: this.food,
      service: this.service,
      punctuality: this.punctuality,
      comment: this.comment.trim() || undefined,
    });
    this.goBack();
  }

  skip(): void {
    this.goBack();
  }
}
