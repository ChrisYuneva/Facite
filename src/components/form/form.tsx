import { useState } from 'react';
import style from './style.module.css';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import ButtonCustom from '../buttonCustom/buttonCustom';
import useKeypress from '../../hooks/useKeyPress';
import { User } from './types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

function Form({ title, handleClick }: FormProps) {
  const { pathname } = useLocation();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function submit() {
    if (user.email && user.password) {
      return handleClick(user.email, user.password);
    } else {
      setAlert('Все поля обязательны');
    }
  }

  function checkRegex(checkStr: string, regex: RegExp, message: string) {
    return checkStr.match(regex) ? '' : message;
  }

  useKeypress('Enter', submit);

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setAlert('');
    const id = event.target.id;
    setUser({ ...user, [id]: event.target.value });
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box className={style.form}>
      <TextField
        label='Email'
        variant='outlined'
        size='small'
        value={user.email}
        id={'email'}
        error={
          user.email
            ? !!checkRegex(user.email, emailRegex, 'Неверный формат почты')
            : !!alert
        }
        helperText={
          user.email
            ? checkRegex(user.email, emailRegex, 'Неверный формат почты')
            : alert
        }
        onChange={(event) => onChange(event)}
      />
      <FormControl variant='outlined'>
        <InputLabel
          htmlFor='password'
          size='small'
          error={
            pathname === '/register' && user.password
              ? !!checkRegex(
                  user.password,
                  passwordRegex,
                  'Пароль должен содержать как минимум 6 символов, 1 заглавную букву, 1 строчную букву и 1 цифру'
                )
              : !!alert
          }
        >
          Пароль
        </InputLabel>
        <OutlinedInput
          size={'small'}
          id='password'
          value={user.password}
          onChange={(event) => onChange(event)}
          type={showPassword ? 'text' : 'password'}
          error={
            pathname === '/register' && user.password
              ? !!checkRegex(
                  user.password,
                  passwordRegex,
                  'Пароль должен содержать как минимум 6 символов, 1 заглавную букву, 1 строчную букву и 1 цифру'
                )
              : !!alert
          }
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
        />
        {pathname === '/register' &&
          !!checkRegex(
            user.password,
            passwordRegex,
            'Пароль должен содержать как минимум 6 символов, 1 заглавную букву, 1 строчную букву и 1 цифру'
          ) && (
            <FormHelperText error id='accountId-error'>
              {pathname === '/register' && user.password
                ? checkRegex(
                    user.password,
                    passwordRegex,
                    'Пароль должен содержать как минимум 6 символов, 1 заглавную букву, 1 строчную букву и 1 цифру'
                  )
                : alert}
            </FormHelperText>
          )}
      </FormControl>
      <ButtonCustom text={title} variant='contained' onClick={submit} />
    </Box>
  );
}

export default Form;
