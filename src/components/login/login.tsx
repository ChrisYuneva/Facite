import { useAppDispatch } from '../../hooks/hooks';
import { userSlice } from '../../store/slices/userSlice/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from '../form/form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const navigate = useNavigate();

  function handleLogin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
        dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken
        }));
        navigate('/');
    })
    .catch(() => alert('Invalid user'));
  }

  return <>
    <Form title='Войти' handleClick={handleLogin}/>
  </>;
}

export default Login;
