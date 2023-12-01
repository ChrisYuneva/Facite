import CardList from '../../components/cardList/cardList';
import { Box, Grid } from '@mui/material';
import style from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { Task } from '../../store/slices/cardListSlice/types';
import { today } from '../../utils/utilsDate';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import Loader from '../../components/loader/loader';
import { db } from '../../firebase/';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';
import { updateTaskToDB } from '../../firebase/firebase';
import Header from '../../components/header/header';

function MainPage() {
  const { isLoading, toDoList, dbId, userName } = useAppSelector(
    (state) => state.cardList
  );
  const { loading, getToDoList, setId, setUserName } = cardListSlice.actions;
  const dispatch = useAppDispatch();

  const { isAuth, id } = useAuth();

  async function addDB() {
    try {
      if (id !== '') {
        await addDoc(collection(db, 'users'), {
          uid: id,
          toDoList: [],
          userName: userName
        });
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  function dateCheck(toDoList: Task[]) {
    const list = toDoList.filter(
      (item) =>
        !item.dateFullfilment ||
        (item.dateFullfilment.day === today.day &&
          item.dateFullfilment.month === today.month)
    );
    return list.map((item) => {
      if (item.date.day < today.day && item.date.month === today.month && item.date.day !==0) {
        return {
          ...item,
          date: {
            ...item.date,
            day: today.day,
          },
        };
      }
      if (item.date.month < today.month && item.date.day !==0) {
        return {
          ...item,
          date: {
            ...item.date,
            day: today.day,
            month: today.month,
          },
        };
      }
      if (item.date.week < today.week && item.date.day !==0) {
        return {
          ...item,
          date: {
            ...item.date,
            day: today.day,
            month: today.month,
            week: today.week,
          },
        };
      }
      return item;
    });
  }

  async function querySnapshot() {
    const data = await getDocs(
      query(collection(db, 'users'), where('uid', '==', id))
    );
    if (data.docs.length) {
      data.forEach((doc) => {
        const dataToDoList = doc.get('toDoList');
        const dataUserName = doc.get('userName');
        dispatch(getToDoList(dateCheck(dataToDoList)));
        dispatch(setId(doc.id));
        dispatch(setUserName(dataUserName));
      });
    } else {
      addDB();
      querySnapshot();
    }
  }

  useEffect(() => {
    dispatch(loading());
    querySnapshot();
  }, []);

  useEffect(() => {
    updateTaskToDB(toDoList, dbId);
  }, [toDoList]);

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {isAuth ? (
        <Box className={style.wrapper}>
          <Header />
          <Grid container className={style.container} spacing={1}>
            <CardList
              titleList='Сегодня'
              toDoList={toDoList.filter((item) => item.date.day === today.day)}
            />
            <CardList
              titleList='Завтра'
              toDoList={toDoList.filter(
                (item) => item.date.day === today.day + 1
              )}
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
        </Box>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}

export default MainPage;
