import { useState } from 'react';
import { Product, ProductCategory, categoryLabels, categoryIcons } from '@/types/product';
import { getProductStatus } from '@/utils/dateUtils';
import { ProductCard } from './ProductCard';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, Filter, Package } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
}

type FilterOption = 'all' | 'expired' | 'warning' | 'good';

export const ProductList = ({ products, onDeleteProduct }: ProductListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const filters: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'expired', label: 'Vencidos' },
    { id: 'warning', label: 'Vencendo' },
    { id: 'good', label: 'Bom' },
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const status = getProductStatus(product.expirationDate);
      const matchesFilter = activeFilter === 'all' || status === activeFilter;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesFilter && matchesCategory;
    })
    .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime());

  const categories = ['all', ...Object.keys(categoryLabels)] as (ProductCategory | 'all')[];

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
        <p className="text-muted-foreground mt-1">
          {products.length} {products.length === 1 ? 'item' : 'itens'} cadastrados
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-xl"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border',
              selectedCategory === cat
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50'
            )}
          >
            <span>{cat === 'all' ? '📋' : categoryIcons[cat]}</span>
            <span>{cat === 'all' ? 'Todos' : categoryLabels[cat]}</span>
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="card-ios p-8 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {searchQuery || activeFilter !== 'all' || selectedCategory !== 'all'
              ? 'Nenhum produto encontrado'
              : 'Nenhum produto cadastrado'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={onDeleteProduct}
              style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
};
