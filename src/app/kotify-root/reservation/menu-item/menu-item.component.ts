import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { MenuItemService } from '../../../core/services/menu-item.service';
import { OrderService } from '../../../core/services/order.service';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    BackButtonComponent,
    PrimaryButtonComponent,
  ],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  private router = inject(Router);
  private menuItemService = inject(MenuItemService);
  private orderService = inject(OrderService);

  /** Alimentados automáticamente desde /restaurants/:restaurantId/menu/:itemId. */
  restaurantId = input.required<string>();
  itemId = input.required<string>();
  /** Si viene 'add' por query param, fuerza "añadir nuevo" aunque el plato ya esté en el pedido. */
  mode = input<string>();

  item = computed(() => this.menuItemService.getMenuItemById(this.itemId()));

  selectedOptionId: string | null = null;
  notes = '';
  /** true si el plato ya estaba en el pedido (venimos a editarlo, no a añadirlo de cero). */
  isEditing = false;

  constructor() {
    // Cada vez que cambia itemId() (nueva navegación), precarga los datos
    // si el plato ya estaba en el pedido y no se forzó "añadir nuevo";
    // si no, resetea a estado "añadir nuevo".
    effect(() => {
      const item = this.item();
      if (!item) return;

      const forceAddNew = this.mode() === 'add';
      const existing = forceAddNew
        ? undefined
        : this.orderService.snapshot.items.find((i) => i.id === item.id);

      if (existing) {
        this.isEditing = true;
        this.notes = existing.notes ?? '';
        if (item.options?.length) {
          const matched = item.options.find((o) => o.label === existing.option);
          this.selectedOptionId = matched?.id ?? item.options[0].id;
        }
        return;
      }

      this.isEditing = false;
      this.notes = '';
      this.selectedOptionId = item.options?.length ? item.options[0].id : null;
    });
  }

  selectOption(id: string): void {
    this.selectedOptionId = id;
  }

  /** Flecha de "atrás" — siempre vuelve al resumen del pedido. */
  goBack(): void {
    this.router.navigate(['/order/summary']);
  }

  /** Tras añadir un plato nuevo (no edición), vuelve a la carta para seguir explorando. */
  private goToMenu(): void {
    this.router.navigate(['/restaurants', this.restaurantId(), 'menu']);
  }

  addToOrder(): void {
    const item = this.item();
    if (!item) return;

    const option = item.options?.find((o) => o.id === this.selectedOptionId);
    const trimmedNotes = this.notes.trim() || undefined;

    if (this.isEditing) {
      this.orderService.updateItemDetails(item.id, option?.label, trimmedNotes);
      this.router.navigate(['/order/summary']);
      return;
    }

    this.orderService.addItem({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: 1,
      option: option?.label,
      notes: trimmedNotes,
    });
    this.goToMenu();
  }

  formatPrice(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }
}
