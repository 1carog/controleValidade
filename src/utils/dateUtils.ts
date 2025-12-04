import { ProductStatus } from '@/types/product';
import { differenceInDays, format, isAfter, isBefore, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const getProductStatus = (expirationDate: Date): ProductStatus => {
  const today = startOfDay(new Date());
  const expDate = startOfDay(expirationDate);
  const daysUntilExpiration = differenceInDays(expDate, today);

  if (daysUntilExpiration < 0) {
    return 'expired';
  } else if (daysUntilExpiration <= 45) {
    return 'warning';
  }
  return 'good';
};

export const getDaysUntilExpiration = (expirationDate: Date): number => {
  const today = startOfDay(new Date());
  const expDate = startOfDay(expirationDate);
  return differenceInDays(expDate, today);
};

export const formatExpirationDate = (date: Date): string => {
  return format(date, "dd 'de' MMM, yyyy", { locale: ptBR });
};

export const getStatusLabel = (status: ProductStatus): string => {
  switch (status) {
    case 'expired':
      return 'Vencido';
    case 'warning':
      return 'Vence em breve';
    case 'good':
      return 'Bom';
  }
};

export const getExpirationText = (expirationDate: Date): string => {
  const days = getDaysUntilExpiration(expirationDate);
  
  if (days < 0) {
    const absDays = Math.abs(days);
    return `Venceu há ${absDays} ${absDays === 1 ? 'dia' : 'dias'}`;
  } else if (days === 0) {
    return 'Vence hoje';
  } else if (days === 1) {
    return 'Vence amanhã';
  } else if (days <= 7) {
    return `Vence em ${days} dias`;
  }
  return formatExpirationDate(expirationDate);
};
