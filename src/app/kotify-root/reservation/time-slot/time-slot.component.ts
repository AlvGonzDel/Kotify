import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { TimeSlotOption } from '../../../core/interfaces/time-slot.interface';
import { OrderService } from '../../../core/services/order.service';
import { TimeSlotService } from '../../../core/services/time-slot.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';

@Component({
  selector: 'app-time-slot',
  standalone: true,
  imports: [CommonModule, IonContent, BackButtonComponent],
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss'],
})
export class TimeSlotComponent {
  private router = inject(Router);
  private timeSlotService = inject(TimeSlotService);
  private orderService = inject(OrderService);

  readonly slots: TimeSlotOption[] = this.timeSlotService.getAvailableSlots(
    this.orderService.snapshot.restaurantId ?? '',
  );

  goBack(): void {
    this.router.navigate(['/order/summary']);
  }

  selectSlot(slot: TimeSlotOption): void {
    if (!slot.available) return;
    this.orderService.setArrivalSlot({ start: slot.start, end: slot.end });
    this.router.navigate(['/order/time-fine-tune']);
  }
}
