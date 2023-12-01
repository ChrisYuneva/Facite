import { getCookie } from '../utils/utilsCookie';

function useAuth() {
  const id = getCookie('id');
  const email = getCookie('email');
  const token = getCookie('token');

  return {
    isAuth: !!id,
    email,
    token,
    id,
  };
}

export default useAuth;
