export const formatEps = (num) => {
  if (num === undefined || num === null) return '0 EPS';
  return Number(num).toLocaleString('en-US') + ' EPS';
};
