import { Injectable, signal } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant.interface';
import { MOCK_RESTAURANTS } from '../mocks/restaurant.mock';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private readonly restaurantsSignal = signal<Restaurant[]>(MOCK_RESTAURANTS);

  /** Todos los restaurantes cercanos (para restaurant-list). */
  readonly restaurants = this.restaurantsSignal.asReadonly();

  /** Detalle de un restaurante por id (para restaurant-detail). */
  getRestaurantById(id: string): Restaurant | undefined {
    return this.restaurantsSignal().find((r) => r.id === id);
  }
}
