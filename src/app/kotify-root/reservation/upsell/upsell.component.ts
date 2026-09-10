import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { MenuItem } from '../../../core/interfaces/menu-item.interface';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

@Component({
  selector: 'app-upsell',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    BackButtonComponent,
    PrimaryButtonComponent,
    StepperComponent,
  ],
  templateUrl: './upsell.component.html',
  styleUrls: ['./upsell.component.scss'],
})
export class UpsellComponent {
  private router = inject(Router);
  private menuItemService = inject(MenuItemService);
  private orderService = inject(OrderService);

  readonly items: MenuItem[] = this.loadItems();

  /** Signal del pedido en curso: al leerlo en el template, la vista se
   * actualiza sola cada vez que se añade/quita algo, sin async pipe. */
  readonly order = this.orderService.order;

  goBack(): void {
    this.router.navigate(['/order/details']);
  }

  quantityOf(item: MenuItem): number {
    return this.order()
      .items.filter((i) => i.id === item.id)
      .reduce((sum, i) => sum + i.quantity, 0);
  }

  addItem(item: MenuItem): void {
    this.orderService.addItem({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: 1,
    });
  }

  onQuantityChange(item: MenuItem, quantity: number): void {
    this.orderService.updateItemQuantity(item.id, quantity);
  }

  skip(): void {
    this.router.navigate(['/order/checkout']);
  }

  continue(): void {
    this.router.navigate(['/order/checkout']);
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  private loadItems(): MenuItem[] {
    const restaurantId = this.orderService.snapshot.restaurantId;
    if (!restaurantId) return [];
    return this.menuItemService
      .getMenuByRestaurant(restaurantId)
      .filter(
        (item) => item.category === 'postres' || item.category === 'bebidas',
      );
  }
}
