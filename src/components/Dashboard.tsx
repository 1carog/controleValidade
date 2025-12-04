import { Product } from '@/types/product';
import { getProductStatus, getDaysUntilExpiration } from '@/utils/dateUtils';
import { SummaryCard } from './SummaryCard';
import { ExpirationChart } from './ExpirationChart';
import { ProductCard } from './ProductCard';
import { Package, AlertTriangle, XCircle } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
}

export const Dashboard = ({ products, onDeleteProduct }: DashboardProps) => {
  const totalItems = products.length;
  const expiredItems = products.filter(p => getProductStatus(p.expirationDate) === 'expired').length;
  const expiringItems = products.filter(p => {
    const days = getDaysUntilExpiration(p.expirationDate);
    return days >= 0 && days <= 7;
  }).length;

  const urgentProducts = products
    .filter(p => {
      const status = getProductStatus(p.expirationDate);
      return status === 'expired' || status === 'warning';
    })
    .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Olá! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Confira o status dos seus produtos
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <SummaryCard
          title="Total"
          value={totalItems}
          icon={Package}
          variant="default"
        />
        <SummaryCard
          title="Vencendo"
          value={expiringItems}
          icon={AlertTriangle}
          variant="warning"
        />
        <SummaryCard
          title="Vencidos"
          value={expiredItems}
          icon={XCircle}
          variant="danger"
        />
      </div>

      <ExpirationChart products={products} />

      {urgentProducts.length > 0 && (
        <div>
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-status-warning" />
            Atenção
          </h2>
          <div className="space-y-3">
            {urgentProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={onDeleteProduct}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
