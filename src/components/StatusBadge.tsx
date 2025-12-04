import { ProductStatus } from '@/types/product';
import { getStatusLabel } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'status-badge',
        {
          'status-good': status === 'good',
          'status-warning': status === 'warning',
          'status-expired': status === 'expired',
        },
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
};
