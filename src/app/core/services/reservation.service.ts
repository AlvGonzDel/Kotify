import { Injectable, signal } from '@angular/core';
import { Order } from '../interfaces/order.interface';
import {
  Reservation,
  ReservationRating,
  ReservationStatus,
} from '../interfaces/reservation.interface';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly reservationsSignal = signal<Reservation[]>([]);
  private counter = 1;

  readonly reservations = this.reservationsSignal.asReadonly();

  /** Crea una reserva confirmada a partir del pedido en curso, tras pagar en checkout. */
  createFromOrder(
    order: Order,
    restaurantName: string,
    restaurantAddress: string,
    dateLabel: string,
  ): Reservation {
    const total = order.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    );
    const id = `CLV-2024-${String(this.counter).padStart(3, '0')}`;
    this.counter++;

    const reservation: Reservation = {
      id,
      restaurantId: order.restaurantId ?? '',
      restaurantName,
      restaurantAddress,
      date: dateLabel,
      arrivalTime: order.arrivalTime ?? '',
      partySize: order.partySize,
      items: order.items,
      total,
      customerEmail: order.customerEmail,
      status: 'confirmed',
    };

    this.reservationsSignal.update((list) => [...list, reservation]);
    return reservation;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservationsSignal().find((r) => r.id === id);
  }

  updateStatus(id: string, status: ReservationStatus): void {
    this.reservationsSignal.update((list) =>
      list.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  }

  /** Cambia la hora de llegada de una reserva ya confirmada (flujo "Tengo un problema"). */
  updateArrivalTime(id: string, arrivalTime: string): void {
    this.reservationsSignal.update((list) =>
      list.map((r) => (r.id === id ? { ...r, arrivalTime } : r)),
    );
  }

  /** Guarda la valoración enviada tras una reserva completada. */
  submitRating(id: string, rating: ReservationRating): void {
    this.reservationsSignal.update((list) =>
      list.map((r) => (r.id === id ? { ...r, rating } : r)),
    );
  }
}
