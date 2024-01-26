import type { IEditItemWidthComponentProps } from './interface';
import React from 'react';
import Cascader from '../../Cascader';
import type { ICascaderProps } from '../../Cascader';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<ICascaderProps>) => {
  const tip = `请选择${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <Cascader placeholder={tip} {...componentProps} />
    </FormItem>
  );
};
