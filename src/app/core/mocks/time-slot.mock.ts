import { TimeSlotOption } from '../interfaces/time-slot.interface';

// Datos de prueba. Sustituir por llamadas HTTP reales cuando exista la API.
export const MOCK_TIME_SLOTS: TimeSlotOption[] = [
  { start: '13:00', end: '13:15', available: true },
  { start: '13:15', end: '13:30', available: true },
  { start: '13:30', end: '13:45', available: false },
  { start: '13:45', end: '14:00', available: true },
  { start: '14:00', end: '14:15', available: true },
  { start: '14:15', end: '14:30', available: true },
  { start: '14:30', end: '14:45', available: false },
  { start: '14:45', end: '15:00', available: true },
  { start: '15:00', end: '15:15', available: true },
];
