import FormWrapper from '../../components/formWrapper/formWrapper';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from '../../components/form/form';
import { useState } from 'react';
import AlertCustom from '../../components/alert/alert';

function LoginPage() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState('');

  function handleLogin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        document.cookie = `id=${user.uid}`;
        document.cookie = `email=${user.email}`;
        document.cookie = `token=${user.refreshToken}`;
        document.cookie = `name=${user.displayName}`;
      })
      .then(() => navigate('/'))
      .catch(() => setAlert('Такого пользователя не существует. Пожалуйста, проверьте данные.'));
  }

  return (
    <FormWrapper
      title='Авторизация'
      btnText='Зарегистрируйтесь'
      navigateTo='/register'
    >
      {
        alert && <AlertCustom alert={alert} />
      }
      <Form title='Войти' handleClick={handleLogin} />
    </FormWrapper>
  );
}

export default LoginPage;
