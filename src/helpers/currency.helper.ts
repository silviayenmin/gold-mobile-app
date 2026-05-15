import { APP_CONFIG } from '../constants/app';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: APP_CONFIG.currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatWeight = (grams: number): string => {
  return `${grams.toFixed(3)}g`;
};
