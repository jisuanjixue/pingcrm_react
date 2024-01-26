import React from 'react';
import type { IEditItemWidthComponentProps } from './interface';
import type { DatePickerProps } from '../../DatePicker';
import DatePicker from '../../DatePicker';
import FormItem from './FormItem';
import { getLabelText, getFormItemRequired } from './utils';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<DatePickerProps>) => {
  const tip = `请选择${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <DatePicker placeholder={tip} {...componentProps} />
    </FormItem>
  );
};
