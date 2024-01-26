import { convertToMoment } from '../../utils/dateUtils';
import type {
  PickerBaseProps,
  PickerDateProps,
  PickerTimeProps,
} from 'antd/lib/date-picker/generatePicker';
import type { Moment } from 'moment';
import React from 'react';
import { DatePicker as ADatePicker } from 'antd';
import type {
  RangePickerBaseProps,
  RangePickerDateProps,
  RangePickerTimeProps,
} from 'antd/lib/date-picker/generatePicker';

type exinlude = 'value' | 'onChange';

export type DatePickerProps = {
  /**
   * 扩展基础组件的value，增加string的支持
   */
  value?: Moment | string | null;

  /**
   * 和原始函数调换了输出参数顺序
   */
  onChange?: (value: string, date: Moment | null) => void;
} & (
    | Omit<PickerBaseProps<Moment>, exinlude>
    | Omit<PickerDateProps<Moment>, exinlude>
    | Omit<PickerTimeProps<Moment>, exinlude>
  );

const DatePickerComponent = ({ value, onChange, ...props }: DatePickerProps) => (
  <ADatePicker
    value={convertToMoment(value)}
    onChange={(date, val) => onChange?.(val, date)}
    {...props}
  />
);

export type RangePickerProps = (
  | Omit<RangePickerBaseProps<Moment>, exinlude>
  | Omit<RangePickerDateProps<Moment>, exinlude>
  | Omit<RangePickerTimeProps<Moment>, exinlude>
) & {
  /**
   * 扩展基础组件的value，增加string的支持
   */
  value?: [Moment | string | null, Moment | string | null];

  /**
   * 和原始函数调换了输出参数顺序
   */
  onChange?: (value: [string, string], date: [Moment | null, Moment | null] | null) => void;
};

/**
 * DatePicker.RangePicker
 * 较基础组件变动：同DatePicker
 */
const RangePicker = ({ value = [null, null], onChange, ...props }: RangePickerProps) => (
  <ADatePicker.RangePicker
    value={[convertToMoment(value[0]) || null, convertToMoment(value[1]) || null]}
    onChange={(date, val) => onChange?.(val, date)}
    {...props}
  />
);

type TDatePicker = typeof DatePickerComponent & {
  RangePicker: (props: RangePickerProps) => JSX.Element;
};

/**
 * DatePicker
 * 较基础组件变动：
 *  value增加对string的支持
 *  onChange中两个参数顺序调换
 */
const DatePicker: TDatePicker = DatePickerComponent as TDatePicker;
DatePicker.RangePicker = RangePicker;

export default DatePicker;
