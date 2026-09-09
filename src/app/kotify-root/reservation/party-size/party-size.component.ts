import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

@Component({
  selector: 'app-party-size',
  standalone: true,
  imports: [
    IonContent,
    BackButtonComponent,
    StepperComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './party-size.component.html',
  styleUrls: ['./party-size.component.scss'],
})
export class PartySizeComponent {
  private router = inject(Router);
  private orderService = inject(OrderService);

  /** Alimentado automáticamente desde /restaurants/:restaurantId/party-size. */
  restaurantId = input.required<string>();

  // Contador local: no necesita ser un signal porque solo se lee/escribe
  // dentro de esta pantalla vía [(value)] con app-stepper.
  partySize = this.orderService.snapshot.partySize || 2;

  goBack(): void {
    this.router.navigate(['/restaurants', this.restaurantId()]);
  }

  continue(): void {
    this.orderService.setRestaurant(this.restaurantId());
    this.orderService.setPartySize(this.partySize);
    this.router.navigate(['/restaurants', this.restaurantId(), 'menu']);
  }
}
