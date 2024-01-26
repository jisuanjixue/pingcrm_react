import type { IEditItemWidthComponentProps } from './interface';
import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import React from 'react';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<SwitchProps>) => {
  const tip = `请选择${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)} valuePropName="checked">
      <Switch {...componentProps} />
    </FormItem>
  );
};
