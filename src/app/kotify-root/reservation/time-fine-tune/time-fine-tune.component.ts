import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

/** Debe coincidir exactamente con la altura de fila definida en el SCSS (.minute-row). */
const ITEM_HEIGHT = 56;

@Component({
  selector: 'app-time-fine-tune',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    BackButtonComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './time-fine-tune.component.html',
  styleUrls: ['./time-fine-tune.component.scss'],
})
export class TimeFineTuneComponent implements AfterViewInit {
  private router = inject(Router);
  private orderService = inject(OrderService);

  @ViewChild('minuteWheel') minuteWheelRef?: ElementRef<HTMLDivElement>;

  private readonly slot = this.orderService.snapshot.arrivalSlot;
  private readonly startMinute: number;

  readonly hour: number;
  readonly minuteOptions: number[];
  minute: number;

  constructor() {
    const [startHour, startMin] = (this.slot?.start ?? '13:00')
      .split(':')
      .map(Number);

    this.hour = startHour;
    this.startMinute = startMin;
    this.minuteOptions = Array.from({ length: 15 }, (_, i) => startMin + i);
    this.minute = startMin;

    // Si ya habías elegido una hora antes (volviste atrás), recupérala.
    const existingArrival = this.orderService.snapshot.arrivalTime;
    if (existingArrival) {
      const [exHour, exMin] = existingArrival.split(':').map(Number);
      if (exHour === this.hour && exMin >= startMin && exMin <= startMin + 14) {
        this.minute = exMin;
      }
    }
  }

  ngAfterViewInit(): void {
    const el = this.minuteWheelRef?.nativeElement;
    if (el) {
      el.scrollTop = (this.minute - this.startMinute) * ITEM_HEIGHT;
    }
  }

  onWheelScroll(event: Event): void {
    const el = event.target as HTMLDivElement;
    const index = Math.round(el.scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.min(
      Math.max(index, 0),
      this.minuteOptions.length - 1,
    );
    this.minute = this.minuteOptions[clampedIndex];
  }

  get arrivalTimeLabel(): string {
    return `${this.pad(this.hour)}:${this.pad(this.minute)}`;
  }

  get intervalLabel(): string {
    return this.slot ? `${this.slot.start} – ${this.slot.end}` : '';
  }

  goBack(): void {
    this.router.navigate(['/order/time-slot']);
  }

  confirm(): void {
    this.orderService.setArrivalTime(this.arrivalTimeLabel);
    this.router.navigate(['/order/details']);
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
