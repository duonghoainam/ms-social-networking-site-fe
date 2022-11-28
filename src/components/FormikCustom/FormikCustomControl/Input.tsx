import React, { ReactElement } from 'react';
import { Field, ErrorMessage } from 'formik';

import '../form.css';
import TextError from './TextError';

const Input = (props: any): ReactElement => {
  const { label, name, ...rest } = props;

  return (
    <div className="form_control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
