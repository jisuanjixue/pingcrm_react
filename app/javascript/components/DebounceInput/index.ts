import _Input from './Input';
import _InputNumber from './InputNumber';
import _Password from './Password';
import _TextArea from './TextArea';

type TInput = typeof _Input & {
  Number: typeof _InputNumber;
  TextArea: typeof _TextArea;
  Password: typeof _Password;
};

const Input = _Input as TInput;
Input.Number = _InputNumber;
Input.TextArea = _TextArea;
Input.Password = _Password;

export default Input;
