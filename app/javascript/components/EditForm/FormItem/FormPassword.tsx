import type { IEditItemWidthComponentProps } from './interface';
import React from 'react';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';
import { DebounceInput } from '../../';
import { IPasswordProps } from '../../DebounceInput/Password';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<IPasswordProps>) => {
  const tip = `请输入${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <DebounceInput.Password placeholder={tip} allowClear {...componentProps} />
    </FormItem>
  );
};
