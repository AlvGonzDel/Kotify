export type MenuCategory = 'entrantes' | 'principales' | 'postres' | 'bebidas';

export interface MenuItemOption {
  id: string;
  label: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  /** ej. opciones de aliño para una ensalada */
  options?: MenuItemOption[];
}

export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  entrantes: 'Entrantes',
  principales: 'Principales',
  postres: 'Postres',
  bebidas: 'Bebidas',
};
