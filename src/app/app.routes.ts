import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirección inicial
  {
    path: '',
    redirectTo: 'restaurants/casa-levante',
    pathMatch: 'full',
  },

  // ---- AUTH ----
  {
    path: 'welcome',
    loadComponent: () =>
      import('./kotify-root/auth/welcome/welcome.component').then(
        (m) => m.WelcomeComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./kotify-root/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },

  // ---- RESTAURANTS ----
  {
    path: 'restaurants',
    loadComponent: () =>
      import('./kotify-root/restaurants/restaurant-list/restaurant-list.component').then(
        (m) => m.RestaurantListComponent,
      ),
  },
  {
    path: 'restaurants/:restaurantId',
    loadComponent: () =>
      import('./kotify-root/restaurants/restaurant-detail/restaurant-detail.component').then(
        (m) => m.RestaurantDetailComponent,
      ),
  },

  // ---- RESERVATION FLOW ----
  {
    path: 'restaurants/:restaurantId/party-size',
    loadComponent: () =>
      import('./kotify-root/reservation/party-size/party-size.component').then(
        (m) => m.PartySizeComponent,
      ),
  },
  {
    path: 'restaurants/:restaurantId/menu',
    loadComponent: () =>
      import('./kotify-root/reservation/menu/menu.component').then(
        (m) => m.MenuComponent,
      ),
  },
  {
    path: 'restaurants/:restaurantId/menu/:itemId',
    loadComponent: () =>
      import('./kotify-root/reservation/menu-item/menu-item.component').then(
        (m) => m.MenuItemComponent,
      ),
  },
  {
    path: 'order/summary',
    loadComponent: () =>
      import('./kotify-root/reservation/order-summary/order-summary.component').then(
        (m) => m.OrderSummaryComponent,
      ),
  },
  {
    path: 'order/time-slot',
    loadComponent: () =>
      import('./kotify-root/reservation/time-slot/time-slot.component').then(
        (m) => m.TimeSlotComponent,
      ),
  },
  {
    path: 'order/time-fine-tune',
    loadComponent: () =>
      import('./kotify-root/reservation/time-fine-tune/time-fine-tune.component').then(
        (m) => m.TimeFineTuneComponent,
      ),
  },
  {
    path: 'order/details',
    loadComponent: () =>
      import('./kotify-root/reservation/order-details/order-details.component').then(
        (m) => m.OrderDetailsComponent,
      ),
  },
  {
    path: 'order/upsell',
    loadComponent: () =>
      import('./kotify-root/reservation/upsell/upsell.component').then(
        (m) => m.UpsellComponent,
      ),
  },
  {
    path: 'order/checkout',
    loadComponent: () =>
      import('./kotify-root/reservation/checkout/checkout.component').then(
        (m) => m.CheckoutComponent,
      ),
  },
  {
    path: 'order/confirmation',
    loadComponent: () =>
      import('./kotify-root/reservation/confirmation/confirmation.component').then(
        (m) => m.ConfirmationComponent,
      ),
  },

  // ---- RESERVATION MANAGEMENT ----
  {
    path: 'reservations/:reservationId',
    loadComponent: () =>
      import('./kotify-root/reservation/my-reservation/my-reservation.component').then(
        (m) => m.MyReservationComponent,
      ),
  },
  {
    path: 'reservations/:reservationId/change-time',
    loadComponent: () =>
      import('./kotify-root/reservation/change-time/change-time.component').then(
        (m) => m.ChangeTimeComponent,
      ),
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
