export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('ng-NG', {
    style: 'currency',
    currency: 'NGA',
  }).format(amount);
};
