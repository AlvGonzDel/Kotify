import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MenuItem } from '../interfaces/menu.interface';
import { MOCK_MENU_ITEMS } from '../mocks/menu.mock';

@Injectable({ providedIn: 'root' })
export class MenuItemService {
  /** Toda la carta de un restaurante (para la pantalla menu). */
  getMenuByRestaurant(restaurantId: string): Observable<MenuItem[]> {
    return of(
      MOCK_MENU_ITEMS.filter((item) => item.restaurantId === restaurantId),
    ).pipe(delay(300));
  }

  /** Detalle de un plato concreto (para menu-item / upsell). */
  getMenuItemById(id: string): Observable<MenuItem | undefined> {
    return of(MOCK_MENU_ITEMS.find((item) => item.id === id)).pipe(delay(200));
  }
}
