import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { ReservationService } from '../../../core/services/reservation.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-cancel-reservation',
  standalone: true,
  imports: [CommonModule, IonContent, BackButtonComponent],
  templateUrl: './cancel-reservation.component.html',
  styleUrls: ['./cancel-reservation.component.scss'],
})
export class CancelReservationComponent {
  private router = inject(Router);
  private reservationService = inject(ReservationService);

  /** Alimentado automáticamente desde /reservations/:reservationId/cancel. */
  reservationId = input.required<string>();

  reservation = computed(() =>
    this.reservationService.getReservationById(this.reservationId()),
  );

  /** Minutos que faltan hasta la hora de llegada (puede ser negativo si ya pasó). */
  private minutesUntilArrival(arrivalTime: string): number {
    const [h, m] = arrivalTime.split(':').map(Number);
    const arrival = new Date();
    arrival.setHours(h, m, 0, 0);
    return (arrival.getTime() - Date.now()) / 60000;
  }

  refundPercentage(arrivalTime: string): number {
    const minutes = this.minutesUntilArrival(arrivalTime);
    if (minutes > 30) return 100;
    if (minutes >= 15) return 90;
    if (minutes > 0) return 50;
    return 0;
  }

  refundAmount(total: number, arrivalTime: string): number {
    return total * (this.refundPercentage(arrivalTime) / 100);
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  goBack(): void {
    this.router.navigate(['/reservations', this.reservationId()]);
  }

  keepReservation(): void {
    this.goBack();
  }

  confirmCancel(): void {
    this.reservationService.updateStatus(this.reservationId(), 'cancelled');
    this.router.navigate(['/cancellation-confirmed']);
  }
}
