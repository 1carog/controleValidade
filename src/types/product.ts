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
  conditioner: 'Condicionador',
  comb: 'Creme para pentear',
  exfoliating: 'Esfoliante',
  freshness: 'Frescor',
  hydration: 'Hidratação Capilar',
  moisturizer: 'Hidratante',
  perfume: 'Perfume',
  soap: 'Sabonete',
  serum: 'Sérum',
  shampoo: 'Shampoo',
  tonic: 'Tônico',
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
