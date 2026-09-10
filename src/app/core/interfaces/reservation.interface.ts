import { OrderItem } from './order.interface';

export type ReservationStatus =
  | 'confirmed'
  | 'preparing'
  | 'arrived'
  | 'completed'
  | 'cancelled';

export interface ReservationRating {
  overall: number;
  food: number;
  service: number;
  punctuality: number;
  comment?: string;
}

export interface Reservation {
  id: string; // ej. 'CLV-2024-001'
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  date: string; // ej. 'Lunes 7 de septiembre'
  arrivalTime: string;
  partySize: number;
  items: OrderItem[];
  total: number;
  customerEmail: string;
  status: ReservationStatus;
  rating?: ReservationRating;
}
