import type { ICheckboxProps } from '../../Checkbox';
import type { IEditItemWidthComponentProps } from './interface';
import React from 'react';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';
import Checkbox from '../../Checkbox';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<ICheckboxProps>) => {
  const tip = `请选择${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <Checkbox {...componentProps} />
    </FormItem>
  );
};
