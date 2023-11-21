import { useState } from 'react';
import style from './style.module.css';
import { Box, TextField } from '@mui/material';
import ButtonCustom from '../buttonCustom/buttonCustom';
interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

function Form({ title, handleClick }: FormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box className={style.form}>
      <TextField
        label='Email'
        variant='outlined'
        size='small'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        // placeholder='email'
      />
      <TextField
        type='password'
        value={password}
        size='small'
        variant='outlined'
        label='Пароль'
        onChange={(event) => setPassword(event.target.value)}
        // placeholder='password'
      />
      <ButtonCustom text={title} variant='contained' onClick={() => handleClick(email, password)} />
    </Box>
  );
}

export default Form;
