import type { ISelectListItem } from '../../../dataTypes/selectListItem';
import type { ISelectProps } from '../../Select';
import type { SelectValue } from 'antd/lib/select';
import type { IEditItemWidthComponentProps } from './interface';
import React from 'react';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';
import Select from '../../Select';

export default <
  TDataItem extends ISelectListItem = ISelectListItem,
  TV extends SelectValue = SelectValue,
>({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<ISelectProps<TDataItem, TV>>) => {
  const tip = `请选择${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <Select<TDataItem, TV> placeholder={tip} {...componentProps} />
    </FormItem>
  );
};
