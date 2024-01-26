import type { IEditFormItemProps } from './interface';
import React from 'react';
import { Input } from 'antd';
import FormItem from './FormItem';
import { getFormItemRequired } from './utils';

export default ({ required, ...props }: IEditFormItemProps<any>) => (
  <FormItem noStyle {...props} required={getFormItemRequired(required, '')}>
    <Input hidden />
  </FormItem>
);
