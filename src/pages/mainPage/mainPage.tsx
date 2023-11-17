import CardList from '../../components/cardList/cardList';
import { Grid } from '@mui/material';
import style from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect, useState } from 'react';
import { DateFormat } from '../../store/types/types';
import { getCurrentWeek } from '../../utils/utils';

import { useNavigate, Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { userSlice } from '../../store/slices/userSlice/userSlice';

const currentDate = new Date();

function MainPage() {
  const { toDoList } = useAppSelector((state) => state.cardList);
  const { removeUser } = userSlice.actions;

  const dispatch = useAppDispatch();

  const [today, setToday] = useState<DateFormat>({
    day: 0,
    month: 0,
    week: 0,
    year: 0,
  });

  const shouldRedirect = true;

  const navigate = useNavigate();

  const {isAuth, email} = useAuth();

  useEffect(() => {
    setToday({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      week: getCurrentWeek(currentDate),
      year: currentDate.getFullYear(),
    });
    // if (shouldRedirect) {
    //     navigate('/login');
    //   }
  }, []);
  

  return (
    <>
    {
        isAuth ? (
            <Grid container xs={12}>
            <Grid item xs={12} className={style.wrap}>
              <CardList
                titleList='Сегодня'
                toDoList={toDoList.filter((item) => item.date.day === today.day)}
              />
              <CardList
                titleList='Завтра'
                toDoList={toDoList.filter((item) => item.date.day === today.day + 1)}
              />
              <CardList
                titleList='На следующей неделе'
                toDoList={toDoList.filter(
                  (item) => item.date.week === today.week + 1
                )}
              />
              <CardList
                titleList='Потом'
                toDoList={toDoList.filter((item) => item.date.day === 0)}
              />
            </Grid>
            <button onClick={() => dispatch(removeUser())}>Log out {email}</button>
          </Grid> 
        )
        : ( <Navigate to='/login' />)
    }
    </>
  );
}

export default MainPage;
