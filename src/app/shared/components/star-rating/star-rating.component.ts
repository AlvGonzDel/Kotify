import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <div class="flex items-center gap-1">
      <button
        type="button"
        *ngFor="let star of stars"
        class="p-0.5 border-0 bg-transparent"
        [attr.aria-label]="'Valorar con ' + star + ' estrellas'"
        (click)="select(star)"
      >
        <ion-icon
          [name]="star <= value ? 'star-filled' : 'star'"
          class="text-lg"
          [ngClass]="star <= value ? 'text-[#f5a623]' : 'text-kotify-ink/20'"
        ></ion-icon>
      </button>
    </div>
  `,
})
export class StarRatingComponent {
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  readonly stars = [1, 2, 3, 4, 5];

  select(star: number): void {
    this.value = star;
    this.valueChange.emit(star);
  }
}
