import CardList from '../../components/cardList/cardList';
import { Grid } from '@mui/material';
import style from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect, useState } from 'react';
import { DateFormat } from '../../store/types/types';
import { getCurrentWeek } from '../../utils/utils';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { userSlice } from '../../store/slices/userSlice/userSlice';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import Loader from '../../components/loader/loader';
import { db } from '../../firebase';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';

const currentDate = new Date();

function MainPage() {
  const { isLoading, toDoList } = useAppSelector(
    (state) => state.cardList
  );
  const { removeUser } = userSlice.actions;
  const { loading, getToDoList, setId, resetToDoList } = cardListSlice.actions;

  const dispatch = useAppDispatch();

  const [today, setToday] = useState<DateFormat>({
    day: 0,
    month: 0,
    week: 0,
    year: 0,
  });

  const { isAuth, email, id } = useAuth();

  async function addDB() {
    try {
      if (id !== '') {
        const docRef = await addDoc(collection(db, 'users'), {
          uid: id,
          toDoList: [],
        });
        console.log('Document written with ID: ', docRef.id);
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async function querySnapshot() {
    const data = await getDocs(
      query(collection(db, 'users'), where('uid', '==', id))
    );
    if (data.docs.length) {
      data.forEach((doc) => {
        dispatch(getToDoList(doc.get('toDoList')));
        dispatch(setId(doc.id));
      });
    } else {
      addDB();
      querySnapshot();
    }
  }

  useEffect(() => {
    dispatch(loading());
    setToday({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      week: getCurrentWeek(currentDate),
      year: currentDate.getFullYear(),
    });
    querySnapshot();
  }, []);

  function logout() {
    dispatch(removeUser());
    dispatch(resetToDoList());
  }

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
          <button onClick={logout}>Выйти {email}</button>
        </Grid>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}

export default MainPage;
