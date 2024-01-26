import type { IEditItemWidthComponentProps } from './interface';
import React from 'react';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';
import { DebounceInput } from '../../';
import { ITextAreaProps } from '../../DebounceInput/TextArea';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<ITextAreaProps>) => {
  const tip = `请输入${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <DebounceInput.TextArea placeholder={tip} rows={5} {...componentProps} />
    </FormItem>
  );
};
