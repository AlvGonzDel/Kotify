import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { MOCK_MENU_ITEMS } from '../mocks/menu.mock';

@Injectable({ providedIn: 'root' })
export class MenuItemService {
  private readonly menuItemsSignal = signal<MenuItem[]>(MOCK_MENU_ITEMS);

  readonly menuItems = this.menuItemsSignal.asReadonly();

  /** Toda la carta de un restaurante (para la pantalla menu). */
  getMenuByRestaurant(restaurantId: string): MenuItem[] {
    return this.menuItemsSignal().filter(
      (item) => item.restaurantId === restaurantId,
    );
  }

  /** Detalle de un plato concreto (para menu-item). */
  getMenuItemById(id: string): MenuItem | undefined {
    return this.menuItemsSignal().find((item) => item.id === id);
  }
}
