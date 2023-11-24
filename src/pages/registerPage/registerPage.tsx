import FormWrapper from '../../components/formWrapper/formWrapper';
import Form from '../../components/form/form';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  function handleRegister(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        document.cookie = `id=${user.uid}`;
        document.cookie = `email=${user.email}`;
        document.cookie = `token=${user.refreshToken}`;
        navigate('/');
      })
      .catch(() => alert('Такой пользователь уже существует'));
  }

  return (
    <FormWrapper title='Регистрация' btnText='Войдите' navigateTo='/login'>
      <Form title='Зарегистрироваться' handleClick={handleRegister} />
    </FormWrapper>
  );
}

export default RegisterPage;
