import FormWrapper from '../../components/formWrapper/formWrapper';
import Form from '../../components/form/form';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertCustom from '../../components/alert/alert';
import { useAppDispatch } from '../../hooks/redux';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';

function RegisterPage() {
  const { setUserName } = cardListSlice.actions;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [alert, setAlert] = useState('');

  function handleRegister(email: string, password: string, name?: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if(name) {
          updateProfile(user, {
            displayName: name
          });
          document.cookie = `name=${name}`;
          dispatch(setUserName(name));
        }

        document.cookie = `id=${user.uid}`;
        document.cookie = `email=${user.email}`;
        document.cookie = `token=${user.refreshToken}`;
        navigate('/');
      })
      .catch(() => setAlert('Такой пользователь уже существует'));
  }

  return (
    <FormWrapper title='Регистрация' btnText='Войдите' navigateTo='/login'>
      {
        alert && <AlertCustom alert={alert}/>
      }
      <Form title='Зарегистрироваться' handleClick={handleRegister} />
    </FormWrapper>
  );
}

export default RegisterPage;
