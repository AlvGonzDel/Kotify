import { Order } from '../interfaces/order.interface';

export const EMPTY_ORDER: Order = {
  restaurantId: null,
  partySize: 2,
  items: [],
  arrivalSlot: null,
  arrivalTime: null,
  customerName: '',
  customerEmail: '',
  smsOptIn: false,
};
