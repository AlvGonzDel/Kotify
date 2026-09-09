import { Injectable, signal } from '@angular/core';
import { TimeSlotOption } from '../interfaces/time-slot.interface';
import { MOCK_TIME_SLOTS } from '../mocks/time-slot.mock';

@Injectable({ providedIn: 'root' })
export class TimeSlotService {
  private readonly slotsSignal = signal<TimeSlotOption[]>(MOCK_TIME_SLOTS);

  readonly slots = this.slotsSignal.asReadonly();

  /** Intervalos disponibles para un restaurante (ignora restaurantId por ahora, son los mismos mocks). */
  getAvailableSlots(_restaurantId: string): TimeSlotOption[] {
    return this.slotsSignal();
  }
}
