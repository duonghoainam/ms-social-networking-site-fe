import React, { ReactElement } from 'react';
import Checkbox from './FormikCustomControl/CheckBox';
import Datetimepicker from './FormikCustomControl/DatetimePicker';
import Input from './FormikCustomControl/Input';
import Radiobutton from './FormikCustomControl/RadioButton';
import Select from './FormikCustomControl/Select';
import Textarea from './FormikCustomControl/Textarea';

const FormikControl = (props: any): ReactElement => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest}></Input>;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'radio':
      return <Radiobutton {...rest} />;
    case 'checkbox':
      return <Checkbox {...rest} />;
    case 'datetime':
      return <Datetimepicker {...rest} />;
    default:
      return <></>;
  }
};

export default FormikControl;
