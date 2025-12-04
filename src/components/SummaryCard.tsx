import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'danger';
  className?: string;
}

export const SummaryCard = ({ 
  title, 
  value, 
  icon: Icon, 
  variant = 'default',
  className 
}: SummaryCardProps) => {
  return (
    <div className={cn('card-ios p-4 animate-scale-in', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className={cn(
            'text-3xl font-bold mt-1',
            {
              'text-foreground': variant === 'default',
              'text-status-warning': variant === 'warning',
              'text-status-expired': variant === 'danger',
            }
          )}>
            {value}
          </p>
        </div>
        <div className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center',
          {
            'bg-primary/10': variant === 'default',
            'bg-status-warning-bg': variant === 'warning',
            'bg-status-expired-bg': variant === 'danger',
          }
        )}>
          <Icon className={cn(
            'w-6 h-6',
            {
              'text-primary': variant === 'default',
              'text-status-warning': variant === 'warning',
              'text-status-expired': variant === 'danger',
            }
          )} />
        </div>
      </div>
    </div>
  );
};
