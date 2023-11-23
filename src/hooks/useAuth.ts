// позволяет из люьой точки приложения узнавать, авторизован пользователь или нет, и получать его данные

import { getCookie } from '../utils/utils';

function useAuth() {
//   const { email, token } = useAppSelector((state) => state.user);

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
