export const formatPriceNPR = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  const amount = typeof value === 'string' ? Number(value) : value;
  try {
    return new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(amount);
  } catch (e) {
    return `NPR ${amount}`;
  }
}; 