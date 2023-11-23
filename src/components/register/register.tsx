import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import Form from '../form/form';
import { useNavigate } from 'react-router-dom';

function Register() {
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
    <div>
      <Form title='Зарегистрироваться' handleClick={handleRegister} />
    </div>
  );
}

export default Register;
