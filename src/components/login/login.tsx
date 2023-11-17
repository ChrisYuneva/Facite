import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { userSlice } from '../../store/slices/userSlice/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from '../form/form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useAppDispatch();
  //   const {  } = useAppSelector((state) => state.user);

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

  return <div>
    <Form title='Войти' handleClick={handleLogin}/>
  </div>;
}

export default Login;
