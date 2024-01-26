import type { IEditItemWidthComponentProps } from './interface';
import type { InputNumberProps } from 'antd';
import React from 'react';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';
import { DebounceInput } from '../../';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<InputNumberProps>) => {
  const tip = `请输入${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <DebounceInput.Number
        placeholder={tip}
        {...{ ...componentProps, style: { minWidth: 200, ...componentProps?.style } }}
      />
    </FormItem>
  );
};
