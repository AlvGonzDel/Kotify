import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArrivalSlot, Order, OrderItem } from '../interfaces/order.interface';
import { EMPTY_ORDER } from '../mocks/order.mock';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly orderSubject = new BehaviorSubject<Order>({
    ...EMPTY_ORDER,
  });

  /** Observable del pedido en curso, para pintar en las pantallas del flujo. */
  readonly order$: Observable<Order> = this.orderSubject.asObservable();

  /** Valor actual sin suscribirse (útil para leer antes de navegar). */
  get snapshot(): Order {
    return this.orderSubject.value;
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

  get subtotal(): number {
    return this.snapshot.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
  }

  /** Reinicia el pedido, p.ej. tras confirmar la reserva o cancelar. */
  clear(): void {
    this.orderSubject.next({ ...EMPTY_ORDER });
  }

  private patch(partial: Partial<Order>): void {
    this.orderSubject.next({ ...this.snapshot, ...partial });
  }
}
