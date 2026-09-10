import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { ReservationService } from '../../../core/services/reservation.service';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, PrimaryButtonComponent],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  private router = inject(Router);
  private reservationService = inject(ReservationService);

  /** Alimentado automáticamente desde ?id=CLV-2024-001 en la URL. */
  reservationId = input<string>();

  reservation = computed(() =>
    this.reservationService.getReservationById(this.reservationId() ?? ''),
  );

  qrUrl(id: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      id,
    )}`;
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  viewReservation(id: string): void {
    this.router.navigate(['/reservations', id]);
  }
}
