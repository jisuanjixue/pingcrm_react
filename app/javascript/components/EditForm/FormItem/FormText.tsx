import type { IEditItemWidthComponentProps } from './interface';
import FormItem from './FormItem';
import { getFormItemRequired, getLabelText } from './utils';
import DebounceInput from '../../DebounceInput';
import { IInputProps } from '../../DebounceInput/Input';

export default ({
  componentProps,
  required,
  ...props
}: IEditItemWidthComponentProps<IInputProps>) => {
  const tip = `请输入${getLabelText(props.label)}`;
  return (
    <FormItem {...props} required={getFormItemRequired(required, tip)}>
      <DebounceInput placeholder={tip} allowClear {...componentProps} />
    </FormItem>
  );
};
