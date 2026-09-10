import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cancellation-confirmed',
  standalone: true,
  imports: [IonContent, IonIcon],
  templateUrl: './cancellation-confirmed.component.html',
  styleUrls: ['./cancellation-confirmed.component.scss'],
})
export class CancellationConfirmedComponent {
  private router = inject(Router);

  goHome(): void {
    this.router.navigate(['/restaurants']);
  }
}
