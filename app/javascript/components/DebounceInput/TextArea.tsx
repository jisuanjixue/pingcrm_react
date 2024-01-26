import { Input } from 'antd';
import type { TextAreaProps } from 'antd/lib/input';
import React from 'react';
import { TextAreaRef } from 'antd/lib/input/TextArea';
import useInputValue from './useInputValue';

export interface ITextAreaProps extends TextAreaProps {
  refInstance?: React.Ref<TextAreaRef>;
}
export default ({ refInstance, ...props }: ITextAreaProps) => {
  const { value, onChange } = useInputValue<HTMLTextAreaElement>(props);

  return (
    <Input.TextArea
      ref={refInstance}
      {...{
        ...props,
        value,
        onChange,
      }}
    />
  );
};
