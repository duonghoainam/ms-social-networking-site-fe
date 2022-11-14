import React, { ReactElement } from 'react';
import RegisterForm from '../components/RegisterForm';
import './authPage.scss';

const RegisterPage = (): ReactElement => {
  // const currentUser = useSelector((state) => state.auth.current);
  // const navigate = useNavigate();
  // useEffect(() => {
  //     document.title = 'Midori • Register';
  //     if (Object.entries(currentUser).length !== 0) {
  //         navigate('/');
  //     }
  // }, []);

  return (
    <div className="registerPage">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
