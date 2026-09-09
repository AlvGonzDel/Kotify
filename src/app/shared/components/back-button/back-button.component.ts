import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [IonIcon],
  template: `
    <button
      type="button"
      class="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-kotify-ink text-xl border-0"
      [attr.aria-label]="ariaLabel"
      (click)="back.emit()"
    >
      <ion-icon name="arrow-back"></ion-icon>
    </button>
  `,
})
export class BackButtonComponent {
  @Input() ariaLabel = 'Volver';
  @Output() back = new EventEmitter<void>();
}
