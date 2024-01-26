import type { InputRef } from 'antd';
import { Input } from 'antd';
import { PasswordProps } from 'antd/lib/input';
import React from 'react';
import useInputValue from './useInputValue';

export interface IPasswordProps extends PasswordProps {
  refInstance?: React.Ref<InputRef>;
}
export default ({ refInstance, ...props }: IPasswordProps) => {
  const { value, onChange } = useInputValue<HTMLInputElement>(props);

  return (
    <Input.Password
      ref={refInstance}
      {...{
        ...props,
        value,
        onChange,
      }}
    />
  );
};
