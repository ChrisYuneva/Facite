import Login from '../../components/login/login';
import FormWrapper from '../../components/formWrapper/formWrapper';

function LoginPage() {
  return (
    <FormWrapper
      title='Авторизация'
      btnText='Зарегистрируйтесь'
      navigateTo='/register'
    >
      <Login />
    </FormWrapper>
  );
}

export default LoginPage;
