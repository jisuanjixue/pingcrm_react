/**
 * 是否是Number类型
 * @param value
 * @returns
 */
export const isNumber = (value?: any): boolean => {
  if (typeof value === 'number') return !Number.isNaN(value);

  return false;
};

/**
 *
 * @param value
 * @param minimumFractionDigits
 * @param showStyle
 * @returns
 */
export const formatCurrency = (value?: number, minimumFractionDigits = 2, showStyle = true) => {
  if (!isNumber(value)) return '';

  const moneyIntl = new Intl.NumberFormat('zh-Hans-CN', {
    currency: 'CNY',
    ...(showStyle ? { style: 'currency' } : {}),
    minimumFractionDigits,
  });
  return moneyIntl.format(value!!);
};

/**
 * 格式化number类型
 * @param value
 * @returns
 */
export const formatNumber = (value?: number) => {
  if (!isNumber(value)) return '';

  return new Intl.NumberFormat().format(value!!);
};

/**
 * string转number，转换失败返回默认值（默认为0）
 * @param value
 * @param defaultValue 默认值，默认为0
 * @returns
 */
export const tryParseInt = (value: string, defaultValue = 0): number => {
  const val = parseInt(value, 10);
  if (isNumber(Number(value))) return val;

  return defaultValue;
};
