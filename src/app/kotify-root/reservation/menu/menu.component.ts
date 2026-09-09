import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import {
  MENU_CATEGORY_LABELS,
  MenuCategory,
  MenuItem,
} from '../../../core/interfaces/menu-item.interface';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, IonContent, BackButtonComponent, StepperComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  private router = inject(Router);
  private menuItemService = inject(MenuItemService);
  private orderService = inject(OrderService);

  /** Alimentado automáticamente desde /restaurants/:restaurantId/menu. */
  restaurantId = input.required<string>();

  readonly categories = Object.entries(MENU_CATEGORY_LABELS) as [
    MenuCategory,
    string,
  ][];
  private readonly categorySignal = signal<MenuCategory>('entrantes');

  /** Pedido en curso, reactivo. */
  readonly order = this.orderService.order;

  /** Platos de la categoría seleccionada; se recalcula solo si cambia el restaurante o la categoría. */
  readonly items = computed<MenuItem[]>(() => {
    const all = this.menuItemService.getMenuByRestaurant(this.restaurantId());
    return all.filter((item) => item.category === this.categorySignal());
  });

  get selectedCategory(): MenuCategory {
    return this.categorySignal();
  }

  selectCategory(category: MenuCategory): void {
    this.categorySignal.set(category);
  }

  goBack(): void {
    this.router.navigate(['/restaurants', this.restaurantId(), 'party-size']);
  }

  hasOptions(item: MenuItem): boolean {
    return !!item.options?.length;
  }

  quantityOf(item: MenuItem): number {
    return this.order()
      .items.filter((i) => i.id === item.id)
      .reduce((sum, i) => sum + i.quantity, 0);
  }

  onAdd(item: MenuItem): void {
    if (this.hasOptions(item)) {
      this.router.navigate(
        ['/restaurants', this.restaurantId(), 'menu', item.id],
        { queryParams: { mode: 'add' } },
      );
      return;
    }
    this.orderService.addItem({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: 1,
    });
  }

  goToItemDetail(item: MenuItem): void {
    this.router.navigate([
      '/restaurants',
      this.restaurantId(),
      'menu',
      item.id,
    ]);
  }

  onStepperChange(item: MenuItem, quantity: number): void {
    this.orderService.updateItemQuantity(item.id, quantity);
  }

  orderItemCount(): number {
    return this.order().items.reduce((sum, i) => sum + i.quantity, 0);
  }

  orderTotal(): number {
    return this.order().items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    );
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  goToOrderSummary(): void {
    this.router.navigate(['/order/summary']);
  }
}
