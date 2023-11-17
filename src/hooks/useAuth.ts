// позволяет из люьой точки приложения узнавать, авторизован пользователь или нет, и получать его данные

import { useAppSelector } from './hooks';

function useAuth() {
    const { email, id, token } = useAppSelector((state) => state.user);

    return {
        isAuth: !!email,
        email,
        token,
        id
    };
}

export default useAuth;
