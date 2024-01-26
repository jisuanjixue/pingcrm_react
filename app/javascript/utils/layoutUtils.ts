import type { ColProps } from 'antd';

/**
 * 根据缩放计算响应式配置
 * @param scale 缩放（默认为1）
 * @returns
 */
export const getColProps = (scale?: number): ColProps => {
  const defaultColProps: any = {
    xs: 24, // <576px
    sm: 12, // ≥576px
    md: 8, // ≥768px
    lg: 8, // ≥992px
    xl: 6, // ≥1200px
    xxl: 6, // ≥1600px
  };

  if (!scale || scale === 1) return defaultColProps;

  const colProps: any = {};
  Object.keys(defaultColProps).forEach((key) => {
    colProps[key] = Math.round(Number(defaultColProps[key]) * scale);
  });

  return colProps;
};


export const getFormItemProps = (labelScale?: number) => {
  const col = 24;
  const labelCol = Math.round((labelScale || 0.3) * col);
  const wrapperCol = col - labelCol;
  return { labelCol: { span: labelCol }, wrapperCol: { span: wrapperCol } };
};
