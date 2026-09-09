import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { OrderItem } from '../../../core/interfaces/order.interface';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    BackButtonComponent,
    PrimaryButtonComponent,
    StepperComponent,
  ],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  private router = inject(Router);
  private orderService = inject(OrderService);

  readonly order = this.orderService.order;
  readonly subtotal = this.orderService.subtotal;

  goBack(): void {
    const restaurantId = this.order().restaurantId;
    if (restaurantId) {
      this.router.navigate(['/restaurants', restaurantId, 'menu']);
    } else {
      this.router.navigate(['/restaurants']);
    }
  }

  goToItemDetail(item: OrderItem): void {
    const restaurantId = this.order().restaurantId;
    if (restaurantId) {
      this.router.navigate(['/restaurants', restaurantId, 'menu', item.id]);
    }
  }

  addMoreItems(): void {
    this.goBack();
  }

  onQuantityChange(item: OrderItem, quantity: number): void {
    this.orderService.updateItemQuantity(item.id, quantity);
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  continue(): void {
    this.router.navigate(['/order/time-slot']);
  }
}
