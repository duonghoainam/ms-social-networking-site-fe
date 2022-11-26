/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export const useChangePassword = ({ setShowModal }: any): any => {
  //   const dispatch = useDispatch();

  const [formValues, setFormValues] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  //   const onChangeFormValues = (e): any => {
  //     setFormValues({ ...formValues, [e.target.name]: e.target.value });
  //   };

  //   const onSubmit = async (e): any => {
  //     e.preventDefault();
  //     const action = changePassword(formValues);
  //     const result = await dispatch(action).unwrap();
  //     alert(result.message);
  //     setShowModal(false);
  //   };
  return {
    // onChangeFormValues,
    // onSubmit,
    formValues
  };
};
