export type ProductStatus = 'good' | 'warning' | 'expired';

export type ProductCategory = 
  | 'perfume'
  | 'moisturizer'
  | 'freshness'
  | 'exfoliating'
  | 'soap'
  | 'shampoo'
  | 'conditioner'
  | 'hydration'
  | 'serum'
  | 'tonic'
  | 'comb'
  | 'other';

export interface Product {
  id: string;
  name: string;
  expirationDate: Date;
  quantity: number;
  category: ProductCategory;
  barcode?: string;
  imageUrl?: string;
  createdAt: Date;
}

export const categoryLabels: Record<ProductCategory, string> = {
  perfume: 'Perfume',
  moisturizer: 'Hidratante',
  freshness: 'Frescor',
  exfoliating: 'Esfoliante',
  soap: 'Sabonete',
  shampoo: 'Shampoo',
  conditioner: 'Condicionador',
  hydration: 'Hidratação',
  serum: 'Sérum',
  tonic: 'Tônico',
  comb: 'Creme para pentear',
  other: 'Outros',
};

export const categoryIcons: Record<ProductCategory, string> = {
  perfume: '',
  moisturizer: '',
  freshness: '',
  exfoliating: '',
  soap: '',
  shampoo: '',
  conditioner: '',
  hydration: '',
  serum: '',
  tonic: '',
  comb: '',
  other: '',
};
