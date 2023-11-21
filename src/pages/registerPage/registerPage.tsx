import Register from '../../components/register/register';
import FormWrapper from '../../components/formWrapper/formWrapper';

function RegisterPage() {
  return (
    <FormWrapper title='Регистрация' btnText='Войдите' navigateTo='/login'>
      <Register />
    </FormWrapper>
  );
}

export default RegisterPage;
