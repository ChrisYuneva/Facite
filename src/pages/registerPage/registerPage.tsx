import { Link, useNavigate } from 'react-router-dom';
import Register from '../../components/register/register';

function RegisterPage() {
    const navigate = useNavigate();

  return (
    <div>
      <h1>Регистрация</h1>
      <Register />
      <button onClick={() => navigate('/login')}>Войдите</button>
    </div>
  );
}

export default RegisterPage;
