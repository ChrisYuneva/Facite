import { Link, useNavigate } from 'react-router-dom';
import Login from '../../components/login/login';

function LoginPage() {
    const navigate = useNavigate();

    return(
        <div>
            <h1>Авторизация</h1>
            <Login />
            <button onClick={() => navigate('/register')}>Заругистрируйтесь</button>
        </div>
    );
}

export default LoginPage;