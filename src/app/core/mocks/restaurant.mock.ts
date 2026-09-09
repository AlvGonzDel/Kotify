import { Restaurant } from '../interfaces/restaurant.interface';

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'casa-levante',
    name: 'Casa Levante',
    location: 'Murcia',
    hours: '13:00 – 16:00',
    address: 'Calle Mayor, 14',
    description:
      'Cocina mediterránea de producto. Arroces, pescados de lonja y carnes a la brasa.',
    // Placeholder temporal — sustituir por el asset real del restaurante en src/assets/images
    heroImageUrl: 'https://picsum.photos/seed/casa-levante/800/600',
  },
];
