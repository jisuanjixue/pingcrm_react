import { useControllableValue, useDebounceFn, useSafeState } from 'ahooks';
import { ChangeEvent, useEffect } from 'react';

interface IUseInputProps<T> {
  value?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<T>) => void;
}
const useInputValue = <T>(props: IUseInputProps<T>) => {
  const [value, setInputValue] = useSafeState<string | number | readonly string[]>();
  const [propsValue, propsOnChange] = useControllableValue(props);

  const { run: onChangeDebounce } = useDebounceFn(propsOnChange, { wait: 500 });

  const onChange = (e: ChangeEvent<T>) => {
    e.persist();
    setInputValue((e.target as any).value);
    onChangeDebounce(e);
  };

  useEffect(() => {
    let val = propsValue;
    if (val && typeof val !== 'string') val = propsValue.target.value;

    setInputValue(val);
  }, [propsValue]);

  return { value, onChange };
};

export default useInputValue;
