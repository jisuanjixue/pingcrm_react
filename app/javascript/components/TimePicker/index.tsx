import { convertToMoment } from '../../utils/dateUtils';
import type {
  TimePickerProps as ATimePickerProps,
  TimeRangePickerProps as ATimeRangePickerProps,
} from 'antd/lib/time-picker';
import type { Moment } from 'moment';
import React from 'react';
import { TimePicker as ATimePicker } from 'antd';

type exinlude = 'value' | 'onChange';

export type TimePickerProps = Omit<ATimePickerProps, exinlude> & {
  /**
   * 扩展基础组件的value，增加string的支持
   */
  value?: Moment | string | null;

  /**
   * 和原始函数调换了输出参数顺序
   */
  onChange?: (value: string, date: Moment | null) => void;
};

const TimePickerComponent = ({ value, onChange, ...props }: TimePickerProps) => (
  <ATimePicker
    value={convertToMoment(value)}
    onChange={(date, val) => onChange?.(val, date)}
    {...props}
  />
);

export type RangePickerProps = Omit<ATimeRangePickerProps, exinlude> & {
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
 * TimePicker.RangePicker
 * 较基础组件变动：同TimePicker
 */
const RangePicker = ({ value = [null, null], onChange, ...props }: RangePickerProps) => (
  <ATimePicker.RangePicker
    value={[convertToMoment(value[0]) || null, convertToMoment(value[1]) || null]}
    onChange={(date, val) => onChange?.(val, date)}
    {...props}
  />
);

type TTimePicker = typeof TimePickerComponent & {
  /**
   * TimePicker.RangePicker
   * 较基础组件变动：同TimePicker
   */
  RangePicker: (props: RangePickerProps) => JSX.Element;
};

/**
 * TimePicker
 * 较基础组件变动：
 *  value增加对string的支持
 *  onChange中两个参数顺序调换
 */
const TimePicker: TTimePicker = TimePickerComponent as TTimePicker;
TimePicker.RangePicker = RangePicker;

export default TimePicker;
