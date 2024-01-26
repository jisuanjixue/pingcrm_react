import React from 'react';
import { Form } from 'antd';
import type { IEditFormItemProps } from './interface';
import { genFormItemProps } from './utils';

export default <T,>(props: IEditFormItemProps<T>) => (
  <Form.Item {...genFormItemProps(props)} >{props.children}</Form.Item>
);