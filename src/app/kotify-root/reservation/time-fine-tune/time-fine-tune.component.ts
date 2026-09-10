import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import {
  TimePickerComponent,
  TimePickerSlot,
} from '../../../shared/components/time-picker/time-picker.component';

@Component({
  selector: 'app-time-fine-tune',
  standalone: true,
  imports: [IonContent, BackButtonComponent, TimePickerComponent],
  templateUrl: './time-fine-tune.component.html',
  styleUrls: ['./time-fine-tune.component.scss'],
})
export class TimeFineTuneComponent {
  private router = inject(Router);
  private orderService = inject(OrderService);

  readonly slot: TimePickerSlot = this.orderService.snapshot.arrivalSlot ?? {
    start: '13:00',
    end: '13:15',
  };
  readonly initialTime = this.orderService.snapshot.arrivalTime ?? undefined;

  goBack(): void {
    this.router.navigate(['/order/time-slot']);
  }

  onConfirmed(time: string): void {
    this.orderService.setArrivalTime(time);
    this.router.navigate(['/order/details']);
  }
}
