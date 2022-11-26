import { ErrorMessage, Field } from 'formik';
import React, { ReactElement } from 'react';
import TextError from './TextError';

const Radiobutton = (props: any): ReactElement => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form_control">
      <label>{label}</label>
      <div className="radioGroup">
        <Field name={name} {...rest}>
          {({ field }: any) => {
            return options.map((option: any) => {
              return (
                <React.Fragment key={option.key}>
                  <div className="radioCustom">
                    <input
                      type="radio"
                      id={option.key}
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}></input>
                    <label htmlFor={option.key}>{option.value}</label>
                  </div>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </div>

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Radiobutton;
