import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { OrderService } from '../../../core/services/order.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { RestaurantService } from '../../../core/services/restaurants.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    BackButtonComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  private router = inject(Router);
  private orderService = inject(OrderService);
  private restaurantService = inject(RestaurantService);
  private reservationService = inject(ReservationService);

  /** Signal del pedido, se actualiza solo si algo cambia (ej. vuelves a upsell). */
  readonly order = this.orderService.order;

  private readonly restaurant = this.restaurantService.getRestaurantById(
    this.orderService.snapshot.restaurantId ?? '',
  );

  readonly restaurantName = this.restaurant?.name ?? '';

  readonly formattedDate = this.formatDate(new Date());

  /** Solo decorativo por ahora: selecciona el método de pago visualmente. */
  selectedPayment: 'apple' | 'google' | null = null;

  selectPayment(method: 'apple' | 'google'): void {
    this.selectedPayment = method;
  }

  total(): number {
    return this.order().items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    );
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  goBack(): void {
    this.router.navigate(['/order/upsell']);
  }

  payAndReserve(): void {
    if (!this.restaurant) return;
    const reservation = this.reservationService.createFromOrder(
      this.order(),
      this.restaurant.name,
      `${this.restaurant.address}, ${this.restaurant.location}`,
      this.formattedDate,
    );
    this.orderService.clear();
    this.router.navigate(['/order/confirmation'], {
      queryParams: { reservationId: reservation.id },
    });
  }

  private formatDate(date: Date): string {
    const formatted = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}
