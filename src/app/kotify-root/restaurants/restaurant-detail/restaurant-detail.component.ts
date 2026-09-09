import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Observable, switchMap } from 'rxjs';
import { Restaurant } from '../../../core/interfaces/restaurant.interface';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);

  restaurant$: Observable<Restaurant | undefined> = this.route.paramMap.pipe(
    switchMap((params) =>
      this.restaurantService.getRestaurantById(params.get('restaurantId')!),
    ),
  );

  reserve(restaurantId: string): void {
    this.router.navigate(['/restaurants', restaurantId, 'party-size']);
  }
}
