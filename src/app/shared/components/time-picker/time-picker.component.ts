import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';

/** Debe coincidir exactamente con la altura de fila definida en el SCSS. */
const ITEM_HEIGHT = 56;

export interface TimePickerSlot {
  start: string; // '13:00'
  end: string; // '13:15'
}

/**
 * Selector de hora tipo "rueda" (deslizar minutos), reutilizable en
 * cualquier pantalla que necesite afinar una hora dentro de un intervalo
 * de 15 minutos: time-fine-tune (reserva nueva) y change-time (reserva
 * ya confirmada) comparten este mismo componente.
 */
@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent],
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) slot!: TimePickerSlot;
  /** Hora ya elegida previamente (si vuelves atrás), para recuperarla. */
  @Input() initialTime?: string;
  @Output() confirmed = new EventEmitter<string>();

  @ViewChild('minuteWheel') minuteWheelRef?: ElementRef<HTMLDivElement>;

  hour = 0;
  private startMinute = 0;
  minuteOptions: number[] = [];
  minute = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slot'] && this.slot) {
      this.setupFromSlot();
    }
  }

  ngAfterViewInit(): void {
    this.scrollToMinute();
  }

  private setupFromSlot(): void {
    const [startHour, startMin] = this.slot.start.split(':').map(Number);
    this.hour = startHour;
    this.startMinute = startMin;
    this.minuteOptions = Array.from({ length: 15 }, (_, i) => startMin + i);
    this.minute = startMin;

    if (this.initialTime) {
      const [exHour, exMin] = this.initialTime.split(':').map(Number);
      if (exHour === this.hour && exMin >= startMin && exMin <= startMin + 14) {
        this.minute = exMin;
      }
    }

    // Si el slot cambia después del primer render (p.ej. eliges otro
    // intervalo), re-sincroniza el scroll con el nuevo valor inicial.
    queueMicrotask(() => this.scrollToMinute());
  }

  private scrollToMinute(): void {
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

  confirm(): void {
    this.confirmed.emit(this.arrivalTimeLabel);
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
