import React, { ReactElement } from 'react';

const TextError = (props: any): ReactElement => {
  return <div className="error">{props.children}</div>;
};

export default TextError;
