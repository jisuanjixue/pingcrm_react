import type { FormItemProps } from 'antd/es/form';

export interface IEditFormItemProps<T> extends Omit<FormItemProps<T>, 'required' | 'shouldUpdate'> {
  /**
   * 必填验证
   * 'string'类型：作为必填校验的提示信息
   */
  required?: boolean | string;
}

export interface IEditItemWidthComponentProps<CProps> extends IEditFormItemProps<any> {
  /** 对应antd基础组件的props */
  componentProps?: CProps;
}
