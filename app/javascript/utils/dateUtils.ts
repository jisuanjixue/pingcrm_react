import type { Moment } from 'moment';
import moment, { isMoment } from 'moment';

type TDateValue = Moment | Date | string | undefined | null;

/**
 * 格式化日期时间
 * @param value 支持Moment|Date|string|undefined|null类型的值输入
 * @param format 格式化字符串
 * @returns
 */
export const formatDateTime = (value: TDateValue, format?: string): string => {
  if (!value) return '';

  let formatStr = format;
  if (!formatStr) formatStr = 'YYYY-MM-DD HH:mm';

  const date = isMoment(value) ? value : moment(value);
  return date.format(formatStr);
};

/**
 * 格式化为时间字符串
 * @param value
 * @returns
 */
export const formatTime = (value: TDateValue): string => formatDateTime(value, 'HH:mm:ss');

/**
 * 格式化为日期字符串
 * @param value
 * @returns
 */
export const formatDate = (value: TDateValue): string => formatDateTime(value, 'YYYY-MM-DD');

/**
 * 转换成Moment
 * @param value 如果是Moment类型则直接返回
 * @returns Moment | undefined | null 
 */
export const convertToMoment = (
  value?: string | Date | Moment | null,
): Moment | undefined | null => {
  if (!value) return undefined;

  if (isMoment(value)) return value;

  let valMoment: Moment | undefined | null;
  if (typeof value === 'string') {
    // 判断是否是TimeSpan
    if (value.indexOf('-') === -1) {
      valMoment = moment(`${formatDate(moment())} ${value}`);
    }
  }
  if (!valMoment) valMoment = moment(value);
  if (!valMoment.isValid()) return undefined;

  return valMoment;
};
