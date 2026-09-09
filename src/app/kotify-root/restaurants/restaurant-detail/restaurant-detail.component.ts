import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { RestaurantService } from '../../../core/services/restaurants.service';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, IonContent, PrimaryButtonComponent],
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent {
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);

  /** Alimentado automáticamente desde /restaurants/:restaurantId gracias a withComponentInputBinding. */
  restaurantId = input.required<string>();

  restaurant = computed(() =>
    this.restaurantService.getRestaurantById(this.restaurantId()),
  );

  reserve(): void {
    this.router.navigate(['/restaurants', this.restaurantId(), 'party-size']);
  }
}
