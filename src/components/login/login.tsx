import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from '../form/form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  function handleLogin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
        // dispatch(setUser({
        //     email: user.email ?? '',
        //     id: user.uid,
        //     token: user.refreshToken
        // }));
        document.cookie = `id=${user.uid}`;
        document.cookie = `email=${user.email}`;
        document.cookie = `token=${user.refreshToken}`;
    })
    .then(() => navigate('/'))
    .catch(() => alert('Invalid user'));
  }

  return <>
    <Form title='Войти' handleClick={handleLogin}/>
  </>;
}

export default Login;
