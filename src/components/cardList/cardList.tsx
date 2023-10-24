import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import style from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { cardListSlice } from '../../store/cardListSlice/cardListSlice';
import { useState } from 'react';
import { Task } from '../../store/types/types';
import TaskMenu from '../taskMenu/taskMenu';
import { getCurrentWeek, getUpcomingMonday } from '../../utils/utils';

interface CardListProps {
  titleList: string;
  toDoList: Task[];
}

const currentDate = new Date();

function CardList({ titleList, toDoList }: CardListProps) {
  const [content, setContent] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();
  const { add, update } = cardListSlice.actions;
  const allToDoList = useAppSelector((state) => state.cardList.toDoList);

  function getDate(titleList: string) {
    switch (titleList) {
      case 'Сегодня':
        return {
          day: currentDate.getDate(),
          month: currentDate.getMonth() + 1,
          week: getCurrentWeek(currentDate),
          year: currentDate.getFullYear(),
        };
      case 'Завтра':
        return {
          day: currentDate.getDate() + 1,
          month: currentDate.getMonth() + 1,
          week: getCurrentWeek(currentDate),
          year: currentDate.getFullYear(),
        };
      case 'На следующей неделе':
        return {
          day: getUpcomingMonday(),
          month: currentDate.getMonth() + 1,
          week: getCurrentWeek(currentDate) + 1,
          year: currentDate.getFullYear(),
        };
      default:
        return {
          day: 0,
          month: 0,
          week: 0,
          year: 0,
        };
    }
  }

  function addTask() {
    if (content === '') {
      setAlert(true);
    } else {
      setAlert(false);
      dispatch(add({ content: content, fulfillment: false, date: getDate(titleList) }));
      setContent('');
    }
  }

  function updateTaskFulfillment(task: Task) {
    dispatch(update({ ...task, fulfillment: !task.fulfillment }));
  }

  function onDropTask(event: React.DragEvent<HTMLDivElement>) {
    const currentId = event.dataTransfer.getData('id')
    const currentToDo = allToDoList.find((el) => el.id === currentId);

    dispatch(update({
      id: currentToDo?.id,
      content: currentToDo?.content ?? '',
      fulfillment: currentToDo?.fulfillment ?? false,
      date: getDate(event.currentTarget.id)
    }));

    event.dataTransfer.clearData();
  }

  return (
    <Grid item xs={3}>
      <Card 
        id={titleList} 
        className={style.wrap} 
        onDragOver={(event) => event.preventDefault()} 
        onDrop={event => onDropTask(event)}
        >
        <CardHeader title={titleList} className={style.titleCard}></CardHeader>
        <TextField
          value={content}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContent(event.target.value);
          }}
          error={alert}
          helperText={alert && 'Введите задачу.'}
          className={style.inputTask}
          id='outlined-basic'
          label='Нужно...'
          variant='outlined'
        />

        <FormGroup className={style.taskWrap}>
          {toDoList.map((task) => {
            return (
              <Card
                className={
                  task.fulfillment
                    ? `${style.done} ${style.taskCardWrap}`
                    : style.taskCardWrap
                }
                key={task.id}
                id={task.id}
                draggable={true}
                onDragStart={event => {
                  event.dataTransfer.setData('id', event.target.id);
                }}
              >
                <Checkbox
                  checked={task.fulfillment}
                  onClick={() => updateTaskFulfillment(task)}
                />
                <Typography className={style.taskCardContent}>
                  {task.content}
                </Typography>
                <TaskMenu task={task} />
              </Card>
            );
          })}
        </FormGroup>
        <Button onClick={addTask}>Добавить задачу</Button>
      </Card>
    </Grid>
  );
}

export default CardList;
