import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Restaurant } from '../interfaces/restaurant.interface';
import { MOCK_RESTAURANTS } from '../mocks/restaurant.mock';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  /** Lista de restaurantes cercanos (para la pantalla restaurant-list). */
  getRestaurants(): Observable<Restaurant[]> {
    return of(MOCK_RESTAURANTS).pipe(delay(300));
  }

  /** Detalle de un restaurante por id (para restaurant-detail). */
  getRestaurantById(id: string): Observable<Restaurant | undefined> {
    return of(MOCK_RESTAURANTS.find((r) => r.id === id)).pipe(delay(300));
  }
}
