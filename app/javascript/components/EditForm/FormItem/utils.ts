import type { ReactElement, ReactNode } from 'react';
import { genFormItemRules } from '../../../utils/validators';
import type { IEditFormItemProps } from './interface';

export const getFormItemRequired = (required: boolean | string | undefined, tip: string) =>
  typeof required === 'boolean' && required ? tip : required;

export const getLabelText = (label: ReactNode) => {
  if (typeof label === 'string') return label;

  const children = (label as ReactElement)?.props?.children;

  if (typeof children === 'string') return children;

  return undefined;
};

export const genFormItemProps = ({ required, rules, ...props }: IEditFormItemProps<any>) => ({
  ...props,
  rules: genFormItemRules(required, typeof required === 'string' ? required : '不能为空', rules),
});
