import FormWrapper from '../../components/formWrapper/formWrapper';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from '../../components/form/form';

function LoginPage() {
  const navigate = useNavigate();

  function handleLogin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        document.cookie = `id=${user.uid}`;
        document.cookie = `email=${user.email}`;
        document.cookie = `token=${user.refreshToken}`;
      })
      .then(() => navigate('/'))
      .catch(() => alert('Invalid user'));
  }

  return (
    <FormWrapper
      title='Авторизация'
      btnText='Зарегистрируйтесь'
      navigateTo='/register'
    >
      <Form title='Войти' handleClick={handleLogin} />
    </FormWrapper>
  );
}

export default LoginPage;
