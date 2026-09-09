export interface OrderItem {
  /** id del plato en el menú */
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  /** ej. "Clásico" para el aliño elegido */
  option?: string;
  notes?: string;
}

export interface ArrivalSlot {
  start: string; // '13:00'
  end: string; // '13:15'
}

export interface Order {
  restaurantId: string | null;
  partySize: number;
  items: OrderItem[];
  arrivalSlot: ArrivalSlot | null;
  arrivalTime: string | null; // '13:00' tras afinar minutos
  customerName: string;
  customerEmail: string;
  smsOptIn: boolean;
}
