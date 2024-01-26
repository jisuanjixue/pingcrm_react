import type { InputProps, InputRef } from 'antd';
import { Input } from 'antd';
import React from 'react';
import useInputValue from './useInputValue';

export interface IInputProps extends InputProps {
  refInstance?: React.Ref<InputRef>;
}
export default ({ refInstance, ...props }: IInputProps) => {
  const { value, onChange } = useInputValue<HTMLInputElement>(props);

  return (
    <Input
      ref={refInstance}
      {...{
        ...props,
        value,
        onChange,
      }}
    />
  );
};
