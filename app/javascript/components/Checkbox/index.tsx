import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useMemo } from 'react';
import { Checkbox as ACheckbox } from 'antd';
import { useControllableValue } from 'ahooks';
import type { ISelectListItem } from '../../dataTypes/selectListItem';

interface IFieldName {
  label: string;
  value: string;
}

export interface ICheckboxProps {
  options?: any[] | ISelectListItem[];
  mode?: 'default' | 'single';
  value?: CheckboxValueType | CheckboxValueType[];
  fieldNams?: IFieldName;
  onChange?: (value: CheckboxValueType | CheckboxValueType[]) => void;
}

export default ({
  options,
  fieldNams = { label: 'text', value: 'value' },
  ...props
}: ICheckboxProps) => {
  const mode = useMemo(() => props.mode, [props.mode]);

  const [value, setValue] = useControllableValue(props);

  const checkedValue = useMemo(() => {
    let checkValue: CheckboxValueType[];
    if (mode === 'single') {
      checkValue = [];
      if (![undefined, null].some((val) => val === value)) {
        checkValue.push(value as unknown as CheckboxValueType);
      }
    } else {
      checkValue = value as unknown as CheckboxValueType[];
    }
    return checkValue;
  }, [mode, value]);

  const onChange = (values: CheckboxValueType[]) => {
    let val: CheckboxValueType | CheckboxValueType[];

    if (mode === 'single') {
      [val] = values.filter((v) => !checkedValue?.some((v1) => v1 === v)) || [];
    } else {
      val = values;
    }
    setValue(val);
  };

  return (
    <ACheckbox.Group
      options={(options as any[] | undefined)?.map((item) => ({
        label: item[fieldNams.label],
        value: item[fieldNams.value],
      }))}
      value={checkedValue}
      onChange={onChange}
    />
  );
};
