export interface Company {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const COMPANIES: Company[] = [
  { id: 'google', name: 'Google',  icon: 'google',        count: 50 },
  { id: 'meta',   name: 'Meta',    icon: 'layers',         count: 98  },
  { id: 'amazon', name: 'Amazon',  icon: 'shopping_cart',  count: 212 },
];
