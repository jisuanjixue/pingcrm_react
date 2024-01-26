import { useDebounceFn, useSafeState, useUpdateEffect } from 'ahooks';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import React from 'react';

type ValueType = string | number;

export default (props: InputNumberProps) => {
  const [value, setValue] = useSafeState(props.value);

  const { run: onChangeDebounce } = useDebounceFn(
    (val: ValueType | null) => {
      props.onChange?.(val);
    },
    { wait: 500 },
  );

  const onChange = (val: ValueType | null) => {
    setValue(val);
    onChangeDebounce(val);
  };

  useUpdateEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <InputNumber
      {...{
        ...props,
        value,
        onChange,
      }}
    />
  );
};
