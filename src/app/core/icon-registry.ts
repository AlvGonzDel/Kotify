import { addIcons } from 'ionicons';
import { add, arrowBack, peopleOutline, remove } from 'ionicons/icons';

/** Llamar una única vez en main.ts, antes de bootstrapApplication. */
export function registerAppIcons(): void {
  addIcons({
    'arrow-back': arrowBack,
    remove,
    add,
    people: peopleOutline,
  });
}
