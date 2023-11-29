import CardList from '../../components/cardList/cardList';
import { Grid } from '@mui/material';
import style from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { Task } from '../../store/slices/cardListSlice/types';
import { deleteCookie, getCookie } from '../../utils/utilsCookie';
import { today } from '../../utils/utilsDate';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import Loader from '../../components/loader/loader';
import { db } from '../../firebase/';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';
import { updateTaskToDB } from '../../firebase/firebase';

function MainPage() {
  const { isLoading, toDoList, dbId } = useAppSelector((state) => state.cardList);
  const { loading, getToDoList, setId, resetToDoList } = cardListSlice.actions;

  const dispatch = useAppDispatch();

  const { isAuth, email, id, token } = useAuth();

  async function addDB() {
    try {
      if (id !== '') {
        await addDoc(collection(db, 'users'), {
          uid: id,
          toDoList: [],
        });
        // console.log('Document written with ID: ', docRef.id);
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  function dateCheck(toDoList: Task[]) {
    const list = toDoList.filter((item) => !item.dateFullfilment || (item.dateFullfilment.day === today.day && item.dateFullfilment.month === today.month));
    return list.map((item) => {
      if (item.date.day < today.day && item.date.month === today.month) {
        return {
          ...item,
          date: {
            ...item.date,
            day: today.day,
          },
        };
      }
      if (item.date.month < today.month) {
        return {
          ...item,
          date: {
            ...item.date,
            day: today.day,
            month: today.month,
          },
        };
      }
      if (item.date.week < today.week) {
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
        const data = doc.get('toDoList');
        dispatch(getToDoList(dateCheck(data)));
        dispatch(setId(doc.id));
      });
    } else {
      addDB();
      querySnapshot();
    }
  }

  function logout() {
    deleteCookie('id');
    deleteCookie('name');
    deleteCookie('email');
    deleteCookie('token');
    dispatch(resetToDoList());
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
        <Grid container xs={12} className={style.container}>
          <Grid item xs={12} className={style.wrap}>
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
          <button onClick={logout}>Выйти {getCookie('name')}</button>
        </Grid>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}

export default MainPage;
