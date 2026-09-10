import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { ReservationStatus } from '../../../core/interfaces/reservation.interface';
import { ReservationService } from '../../../core/services/reservation.service';

const STATUS_LABELS: Record<ReservationStatus, string> = {
  confirmed: 'Confirmada',
  preparing: 'Preparando',
  arrived: 'Cliente llegado',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

const STATUS_DOT_CLASSES: Record<ReservationStatus, string> = {
  confirmed: 'bg-green-500',
  preparing: 'bg-amber-500',
  arrived: 'bg-blue-500',
  completed: 'bg-kotify-muted',
  cancelled: 'bg-red-500',
};

@Component({
  selector: 'app-my-reservation',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon],
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss'],
})
export class MyReservationComponent {
  private reservationService = inject(ReservationService);
  private router = inject(Router);

  /** Alimentado automáticamente desde /reservations/:reservationId. */
  reservationId = input.required<string>();

  reservation = computed(() =>
    this.reservationService.getReservationById(this.reservationId()),
  );

  readonly statuses: ReservationStatus[] = [
    'confirmed',
    'preparing',
    'arrived',
    'completed',
  ];

  statusLabel(status: ReservationStatus): string {
    return STATUS_LABELS[status];
  }

  statusDotClass(status: ReservationStatus): string {
    return STATUS_DOT_CLASSES[status];
  }

  qrUrl(id: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      id,
    )}`;
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  /**
   * Solo para demo/testing: en producción el estado lo cambiaría el
   * restaurante (al escanear el QR) o el backend, nunca el propio cliente.
   * Los botones de arriba a la derecha simulan ese cambio de estado
   * mientras no tenemos backend real.
   */
  setStatus(status: ReservationStatus): void {
    this.reservationService.updateStatus(this.reservationId(), status);
  }

  reportProblem(): void {
    this.router.navigate([
      '/reservations',
      this.reservationId(),
      'change-time',
    ]);
  }

  cancelReservation(): void {
    this.router.navigate(['/reservations', this.reservationId(), 'cancel']);
  }

  goToRating(): void {
    this.router.navigate(['/reservations', this.reservationId(), 'rating']);
  }
}
