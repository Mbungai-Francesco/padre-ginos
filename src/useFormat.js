export const useFormat = (locale, style, currency) => {
  const intl = new Intl.NumberFormat(locale, {
    style: style,
    currency: currency,
  });

  return intl;
}