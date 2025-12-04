import { Product, categoryIcons } from '@/types/product';
import { getProductStatus, getExpirationText } from '@/utils/dateUtils';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { Package, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductCard = ({ product, onDelete, className, style }: ProductCardProps) => {
  const status = getProductStatus(product.expirationDate);
  const expirationText = getExpirationText(product.expirationDate);

  return (
    <div 
      className={cn(
        'card-ios p-4 flex items-center gap-4 animate-fade-in',
        className
      )}
      style={style}
    >
      <div className="relative">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
            <span className="text-2xl">{categoryIcons[product.category]}</span>
          </div>
        )}
        <span className="absolute -bottom-1 -right-1 text-lg">
          {categoryIcons[product.category]}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground truncate">
            {product.name}
          </h3>
          <StatusBadge status={status} />
        </div>
        <p className={cn(
          'text-sm mt-0.5',
          {
            'text-muted-foreground': status === 'good',
            'text-status-warning': status === 'warning',
            'text-status-expired': status === 'expired',
          }
        )}>
          {expirationText}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Package className="w-3 h-3" />
            Qtd: {product.quantity}
          </span>
        </div>
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(product.id)}
          className="p-2 rounded-xl hover:bg-status-expired-bg transition-colors"
        >
          <Trash2 className="w-5 h-5 text-status-expired" />
        </button>
      )}
    </div>
  );
};
