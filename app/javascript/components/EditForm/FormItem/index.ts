import FormItem from './FormItem';
// import Hidden from './FormHidden';
import Text from './FormText';
// import TextArea from './FormTextArea';
// import Number from './FormNumber';
// import Checkbox from './FormCheckbox';
// import Select from './FormSelect';
// import Cascader from './FormCascader';
// import Switch from './FormSwitch';
// import DatePicker from './FormDatePicker';
// import TimePicker from './FormTimePicker';
// import Password from './FormPassword';

type TEditFormItem = typeof FormItem & {
  // Hidden: typeof Hidden;
  Text: typeof Text;
  // TextArea: typeof TextArea;
  // Number: typeof Number;
  // Password: typeof Password;
  // Select: typeof Select;
  // Cascader: typeof Cascader;
  // Checkbox: typeof Checkbox;
  // Switch: typeof Switch;
  // DatePicker: typeof DatePicker;
  // TimePicker: typeof TimePicker;
};

const EditFormItem = FormItem as TEditFormItem;
// EditFormItem.Hidden = Hidden;
EditFormItem.Text = Text;
// EditFormItem.TextArea = TextArea;
// EditFormItem.Number = Number;
// EditFormItem.Password = Password;
// EditFormItem.Select = Select;
// EditFormItem.Checkbox = Checkbox;
// EditFormItem.Cascader = Cascader;
// EditFormItem.Switch = Switch;
// EditFormItem.DatePicker = DatePicker;
// EditFormItem.TimePicker = TimePicker;

export default EditFormItem;
