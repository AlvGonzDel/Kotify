import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { OrderService } from '../../../core/services/order.service';

import {
  MENU_CATEGORY_LABELS,
  MenuCategory,
  MenuItem,
} from '../../../core/interfaces/menu.interface';
import { Order } from '../../../core/interfaces/order.interface';
import { MenuItemService } from '../../../core/services/menu.service';
import { BackButtonComponent } from '../../../shared/components/back-buton/back-button.component';
import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, IonContent, BackButtonComponent, StepperComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private menuItemService = inject(MenuItemService);
  private orderService = inject(OrderService);

  readonly categories = Object.entries(MENU_CATEGORY_LABELS) as [
    MenuCategory,
    string,
  ][];
  private readonly categorySubject = new BehaviorSubject<MenuCategory>(
    'entrantes',
  );

  readonly order$: Observable<Order> = this.orderService.order$;

  readonly items$: Observable<MenuItem[]> = combineLatest([
    this.menuItemService.getMenuByRestaurant(this.restaurantId),
    this.categorySubject,
  ]).pipe(
    map(([items, category]) => items.filter((i) => i.category === category)),
  );

  get restaurantId(): string {
    return this.route.snapshot.paramMap.get('restaurantId')!;
  }

  get selectedCategory(): MenuCategory {
    return this.categorySubject.value;
  }

  selectCategory(category: MenuCategory): void {
    this.categorySubject.next(category);
  }

  goBack(): void {
    this.router.navigate(['/restaurants', this.restaurantId, 'party-size']);
  }

  hasOptions(item: MenuItem): boolean {
    return !!item.options?.length;
  }

  quantityOf(item: MenuItem, order: Order): number {
    return order.items
      .filter((i) => i.id === item.id)
      .reduce((sum, i) => sum + i.quantity, 0);
  }

  onAdd(item: MenuItem): void {
    if (this.hasOptions(item)) {
      this.router.navigate([
        '/restaurants',
        this.restaurantId,
        'menu',
        item.id,
      ]);
      return;
    }
    this.orderService.addItem({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: 1,
    });
  }

  onStepperChange(item: MenuItem, quantity: number): void {
    this.orderService.updateItemQuantity(item.id, quantity);
  }

  orderItemCount(order: Order): number {
    return order.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  orderTotal(order: Order): number {
    return order.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  goToOrderSummary(): void {
    this.router.navigate(['/order/summary']);
  }
}
