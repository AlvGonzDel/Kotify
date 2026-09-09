import { Injectable, computed, signal } from '@angular/core';
import { ArrivalSlot, Order, OrderItem } from '../interfaces/order.interface';
import { EMPTY_ORDER } from '../mocks/order.mock';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly orderSignal = signal<Order>({ ...EMPTY_ORDER });

  /** Signal del pedido en curso, para leer reactivamente en las plantillas. */
  readonly order = this.orderSignal.asReadonly();

  /** Total calculado, se recalcula solo cuando cambian los items. */
  readonly subtotal = computed(() =>
    this.orderSignal().items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    ),
  );

  /** Valor actual sin depender de un contexto reactivo (p.ej. antes de navegar). */
  get snapshot(): Order {
    return this.orderSignal();
  }

  setRestaurant(restaurantId: string): void {
    this.patch({ restaurantId });
  }

  setPartySize(partySize: number): void {
    this.patch({ partySize });
  }

  addItem(item: OrderItem): void {
    const items = [...this.snapshot.items];
    const existing = items.find(
      (i) => i.id === item.id && i.option === item.option,
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.patch({ items });
  }

  updateItemQuantity(id: string, quantity: number): void {
    const items = this.snapshot.items
      .map((i) => (i.id === id ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);
    this.patch({ items });
  }

  /** Actualiza la opción/notas de un plato ya presente en el pedido, sin duplicarlo ni tocar su cantidad. */
  updateItemDetails(
    id: string,
    option: string | undefined,
    notes: string | undefined,
  ): void {
    const items = this.snapshot.items.map((i) =>
      i.id === id ? { ...i, option, notes } : i,
    );
    this.patch({ items });
  }

  removeItem(id: string): void {
    this.patch({ items: this.snapshot.items.filter((i) => i.id !== id) });
  }

  setArrivalSlot(slot: ArrivalSlot): void {
    this.patch({ arrivalSlot: slot, arrivalTime: null });
  }

  setArrivalTime(time: string): void {
    this.patch({ arrivalTime: time });
  }

  setCustomerDetails(name: string, email: string, smsOptIn: boolean): void {
    this.patch({ customerName: name, customerEmail: email, smsOptIn });
  }

  /** Reinicia el pedido, p.ej. tras confirmar la reserva o cancelar. */
  clear(): void {
    this.orderSignal.set({ ...EMPTY_ORDER });
  }

  private patch(partial: Partial<Order>): void {
    this.orderSignal.update((current) => ({ ...current, ...partial }));
  }
}
