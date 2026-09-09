import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <div
      class="flex items-center"
      [ngClass]="size === 'lg' ? 'gap-8' : 'gap-2.5'"
    >
      <button
        type="button"
        class="rounded-full flex items-center justify-center"
        [ngClass]="btnClasses"
        [disabled]="value <= min"
        aria-label="Restar"
        (click)="decrease()"
      >
        <ion-icon name="remove"></ion-icon>
      </button>

      <div
        class="flex flex-col items-center"
        [class.min-w-[60px]]="size === 'lg'"
      >
        <span [ngClass]="numberClasses">{{ value }}</span>
        <span
          *ngIf="label"
          class="text-[11px] tracking-wider uppercase text-kotify-muted mt-1.5"
        >
          {{ label }}
        </span>
      </div>

      <button
        type="button"
        class="rounded-full flex items-center justify-center"
        [ngClass]="btnClasses"
        [disabled]="value >= max"
        aria-label="Sumar"
        (click)="increase()"
      >
        <ion-icon name="add"></ion-icon>
      </button>
    </div>
  `,
})
export class StepperComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 99;
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() label?: string;
  @Output() valueChange = new EventEmitter<number>();

  get btnClasses(): string {
    return this.size === 'lg'
      ? 'w-12 h-12 border border-solid border-kotify-ink/30 text-kotify-ink text-xl bg-transparent disabled:opacity-30'
      : 'w-[26px] h-[26px] border-0 bg-kotify-ink text-white text-sm disabled:opacity-30';
  }

  get numberClasses(): string {
    return this.size === 'lg'
      ? 'font-serif text-5xl text-kotify-ink leading-none'
      : 'text-sm font-semibold text-kotify-ink min-w-[12px] text-center';
  }

  decrease(): void {
    if (this.value > this.min) this.emit(this.value - 1);
  }

  increase(): void {
    if (this.value < this.max) this.emit(this.value + 1);
  }

  private emit(next: number): void {
    this.value = next;
    this.valueChange.emit(next);
  }
}
