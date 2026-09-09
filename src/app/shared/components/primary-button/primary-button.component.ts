import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [IonButton],
  template: `
    <ion-button
      expand="block"
      class="primary-button"
      [disabled]="disabled"
      (click)="pressed.emit()"
    >
      <ng-content></ng-content>
    </ion-button>
  `,
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent {
  @Input() disabled = false;
  @Output() pressed = new EventEmitter<void>();
}
