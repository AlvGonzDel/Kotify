import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    BackButtonComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  private router = inject(Router);
  private orderService = inject(OrderService);

  name = this.orderService.snapshot.customerName;
  email = this.orderService.snapshot.customerEmail;
  smsOptIn = this.orderService.snapshot.smsOptIn;

  get isValid(): boolean {
    return this.name.trim().length > 0 && EMAIL_REGEX.test(this.email.trim());
  }

  toggleSms(): void {
    this.smsOptIn = !this.smsOptIn;
  }

  goBack(): void {
    this.router.navigate(['/order/time-fine-tune']);
  }

  continue(): void {
    if (!this.isValid) return;
    this.orderService.setCustomerDetails(
      this.name.trim(),
      this.email.trim(),
      this.smsOptIn,
    );
    this.router.navigate(['/order/upsell']);
  }
}
