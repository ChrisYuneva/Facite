import { useAppDispatch } from '../../hooks/hooks';
import { userSlice } from '../../store/slices/userSlice/userSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import Form from '../form/form';
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useAppDispatch();

  const { setUser } = userSlice.actions;

  const navigate = useNavigate();

  function handleRegister(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email ?? '',
            id: user.uid,
            token: user.refreshToken,
          })
        );
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
