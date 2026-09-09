import { addIcons } from 'ionicons';
import { arrowBack, remove, add } from 'ionicons/icons';

/** Llamar una única vez en main.ts, antes de bootstrapApplication. */
export function registerAppIcons(): void {
  addIcons({ 'arrow-back': arrowBack, remove, add });
}
