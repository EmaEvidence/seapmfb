export const formatAmount = (amount: number) => {
  // return new Intl.NumberFormat('ng-NG', {
  //   // style: 'currency',
  //   // currency: 'NGA',
  // }).format(amount);
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(amount);
};
