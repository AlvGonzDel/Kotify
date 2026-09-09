import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-buton/back-button.component';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);

  partySize = this.orderService.snapshot.partySize || 2;

  get restaurantId(): string {
    return this.route.snapshot.paramMap.get('restaurantId')!;
  }

  goBack(): void {
    this.router.navigate(['/restaurants', this.restaurantId]);
  }

  continue(): void {
    this.orderService.setRestaurant(this.restaurantId);
    this.orderService.setPartySize(this.partySize);
    this.router.navigate(['/restaurants', this.restaurantId, 'menu']);
  }
}
