import { isNumber } from './numberUtils';

/**
 * 字符串有效判断
 * @param value
 * @returns
 */
const isNullOrEmpty = (value?: string) => [undefined, null, ''].some((val) => val === value);

/**
 * number左补位
 * @param num
 * @param len 总长度
 * @returns
 */
const padLeft = (num?: number, len?: number): string | undefined => {
  if (!isNumber(num) || !isNumber(len)) return undefined;

  return (Array(len).join('0') + num).slice(-len!!);
};

/**
 *
 * @param required
 * @param has
 * @returns
 */
const hasPermission = (required?: string | string[], has?: string | string[]): boolean => {
  let requiredPs: string[] = [];
  let hasPs: string[] = [];
  if (required) {
    if (typeof required === 'string') requiredPs = [required];
    else requiredPs = required;
  }
  if (has) {
    if (typeof has === 'string') hasPs = [has];
    else hasPs = has;
  }
  return requiredPs.length ? hasPs?.some((hp) => requiredPs.some((rp) => rp === hp)) : true;
};

export { isNullOrEmpty, padLeft, hasPermission };
