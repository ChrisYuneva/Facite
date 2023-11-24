import { useState } from 'react';
import style from './style.module.css';
import { Box, TextField } from '@mui/material';
import ButtonCustom from '../buttonCustom/buttonCustom';
import useKeypress from '../../hooks/useKeyPress';
import { User } from './types';

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

function Form({ title, handleClick }: FormProps) {
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  });
  
  const [alert, setAlert] = useState('');

  function submit() {
    if(user.email && user.password) {
        return handleClick(user.email, user.password);
    }
    else {
      setAlert('Все поля обязательны');
    }
  }

  function test() {
    // console.log(emailRegex.test(user.email))
    // if(emailRegex.test(user.email) ===false) {
    //   console.log(user.e)
    //   return 'neverno';
    // }

    return emailRegex.test(user.email) ? '123' : '';
  }

  useKeypress('Enter', submit);

  function onChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setAlert('');
    const id = event.target.id;
    setUser({...user, [id]: event.target.value});
  }

  return (
    <Box className={style.form}>
      <TextField
        label='Email'
        variant='outlined'
        size='small'
        value={user.email}
        id={'email'}
        // required
        error={ user.email ? !test() : !!alert }
        helperText={ user.email ? test() : alert }
        onChange={(event) => onChange(event)}
      />
      <TextField
        type='password'
        value={user.password}
        size='small'
        variant='outlined'
        label='Пароль'
        id={'password'}
        // error={ alert && !user.password }
        // helperText={ alert && !user.password && 'Обязательное поле' }
        onChange={(event) => onChange(event)}
      />
      <ButtonCustom 
        text={title} 
        variant='contained' 
        onClick={submit} 
        />
    </Box>
  );
}

export default Form;
