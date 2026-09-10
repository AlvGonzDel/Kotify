import { addIcons } from 'ionicons';
import {
  add,
  arrowBack,
  checkmark,
  close,
  logoApple,
  logoGoogle,
  peopleOutline,
  remove,
  restaurantOutline,
  starOutline,
  timeOutline,
} from 'ionicons/icons';

/** Llamar una única vez en main.ts, antes de bootstrapApplication. */
export function registerAppIcons(): void {
  addIcons({
    'arrow-back': arrowBack,
    remove,
    add,
    people: peopleOutline,
    checkmark,
    'logo-apple': logoApple,
    'logo-google': logoGoogle,
    restaurant: restaurantOutline,
    star: starOutline,
    'time-outline': timeOutline,
    close,
  });
}
