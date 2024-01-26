import type { IEditItemWidthComponentProps } from './interface';
import React from 'react';
import TimePicker from '../../TimePicker';
import type { TimePickerProps } from '../../TimePicker';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';

export default ({
  required,
  componentProps,
  ...props
}: IEditItemWidthComponentProps<TimePickerProps>) => {
  const tip = `请选择${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <TimePicker placeholder={tip} {...componentProps} />
    </FormItem>
  );
};
