export const formatCurrency = (value, currency = 'INR') => {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export const parseNumber = (value) => {
  return Number(String(value).replace(/[^0-9.-]+/g, ''));
};
