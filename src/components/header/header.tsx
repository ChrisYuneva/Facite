import { Box, Button, Typography } from '@mui/material';
import { deleteCookie, getCookie } from '../../utils/utilsCookie';
import style from './style.module.css';
import { useAppDispatch } from '../../hooks/redux';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';

function Header() {
  const { resetToDoList } = cardListSlice.actions;
  const dispatch = useAppDispatch();

  function logout() {
    deleteCookie('id');
    deleteCookie('name');
    deleteCookie('email');
    deleteCookie('token');
    dispatch(resetToDoList());
  }
  return (
    <Box className={style.wrap}>
      <Typography variant='h5'>Привет, {getCookie('name')}!</Typography>
      <Button variant='outlined' onClick={logout}>
        Выйти
      </Button>
    </Box>
  );
}

export default Header;
