import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { TimeSlotOption } from '../../../core/interfaces/time-slot.interface';
import { ReservationService } from '../../../core/services/reservation.service';
import { TimeSlotService } from '../../../core/services/time-slot.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { TimePickerComponent } from '../../../shared/components/time-picker/time-picker.component';

@Component({
  selector: 'app-change-time',
  standalone: true,
  imports: [CommonModule, IonContent, BackButtonComponent, TimePickerComponent],
  templateUrl: './change-time.component.html',
  styleUrls: ['./change-time.component.scss'],
})
export class ChangeTimeComponent {
  private router = inject(Router);
  private timeSlotService = inject(TimeSlotService);
  private reservationService = inject(ReservationService);

  /** Alimentado automáticamente desde /reservations/:reservationId/change-time. */
  reservationId = input.required<string>();

  reservation = computed(() =>
    this.reservationService.getReservationById(this.reservationId()),
  );

  readonly slots: TimeSlotOption[] = this.timeSlotService.getAvailableSlots('');

  /** El primer intervalo disponible después de la hora original se marca
   * como "desbloqueado para ti", simulando que el restaurante lo liberó. */
  get unlockedSlot(): TimeSlotOption | undefined {
    const original = this.reservation()?.arrivalTime;
    if (!original) return this.slots.find((s) => s.available);
    return (
      this.slots.find((s) => s.available && s.start > original) ??
      this.slots.find((s) => s.available)
    );
  }

  isUnlocked(slot: TimeSlotOption): boolean {
    return slot === this.unlockedSlot;
  }

  /** Paso 1: elegir intervalo. Paso 2 (cuando tiene valor): afinar minutos. */
  selectedSlot = signal<TimeSlotOption | null>(null);

  selectSlot(slot: TimeSlotOption): void {
    if (!slot.available) return;
    this.selectedSlot.set(slot);
  }

  goBack(): void {
    if (this.selectedSlot()) {
      // Desde el paso de afinar minutos, "atrás" vuelve a elegir intervalo.
      this.selectedSlot.set(null);
      return;
    }
    this.router.navigate(['/reservations', this.reservationId()]);
  }

  onConfirmed(time: string): void {
    this.reservationService.updateArrivalTime(this.reservationId(), time);
    this.router.navigate(['/reservations', this.reservationId()]);
  }
}
