import {
  Card,
  CardHeader,
  Checkbox,
  FormGroup,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import style from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';
import { useState } from 'react';
import { Priority, Task } from '../../store/slices/cardListSlice/types';
import TaskMenu from '../taskMenu/taskMenu';
import { getDateList, today } from '../../utils/utilsDate';
import { uId } from '../../utils/utilsUId';
import InputTaskMenu from '../inputTaskMenu/inputTaskMenu';
import TaskModalWindow from '../taskModalWindow/taskModalWindow';
import { updateTaskToDB } from '../../firebase/firebase';
import ButtonCustom from '../buttonCustom/buttonCustom';
import useKeypress from '../../hooks/useKeyPress';

interface CardListProps {
  titleList: string;
  toDoList: Task[];
}

function CardList({ titleList, toDoList }: CardListProps) {
  const [content, setContent] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [priority, setPriority] = useState<Priority>('default');
  const [openModal, setOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const dispatch = useAppDispatch();
  const { add, update } = cardListSlice.actions;
  const allToDoList = useAppSelector((state) => state.cardList.toDoList);
  const { dbId } = useAppSelector((state) => state.cardList);

  function addTask() {
    if (content === '') {
      setAlert(true);
    } else {
      const newItem = {
        id: uId(),
        content,
        priority,
        fulfillment: false,
        date: getDateList(titleList),
      };
      setAlert(false);
      dispatch(add(newItem));
      updateTaskToDB([...allToDoList, newItem], dbId);
      setContent('');
      setPriority('default');
    }
  }

  useKeypress('Enter', addTask);

  function updateTaskFulfillment(task: Task) {
    const updateTask: Task = {
      ...task,
      fulfillment: !task.fulfillment,
      dateFullfilment: !task.fulfillment
      ? today
      : undefined 
    };
    dispatch(update(updateTask));
    updateTaskToDB(
      allToDoList.map((item) => {
        if (item.id === updateTask.id) {
          return updateTask;
        }

        return item;
      }),
      dbId);
  }

  function onDropTask(event: React.DragEvent<HTMLDivElement>) {
    const currentId = event.dataTransfer.getData('id');
    const currentToDo = allToDoList.find((el) => el.id === currentId);
    const updateTask = {
      id: currentToDo?.id,
      content: currentToDo?.content ?? '',
      priority: currentToDo?.priority ?? 'default',
      fulfillment: currentToDo?.fulfillment ?? false,
      date: getDateList(event.currentTarget.id),
    };

    dispatch(update(updateTask));
    updateTaskToDB(
      allToDoList.map((item) => {
        if (item.id === updateTask.id) {
          return updateTask;
        }

        return item;
      }), 
    dbId);

    event.dataTransfer.clearData();
  }

  function getClassNameForCard(task: Task) {
    const currentPriority = task.priority;
    const notDefaultStyle = `${style.taskCardWrap} ${
      currentPriority === 'urgently' ? style.urgently : style.veryUrgently
    }`;

    if (task.fulfillment) {
      if (currentPriority !== 'default') {
        return `${style.done} ${notDefaultStyle}`;
      } else {
        return `${style.taskCardWrap} ${style.done}`;
      }
    }

    if (currentPriority !== 'default') {
      return notDefaultStyle;
    }

    return style.taskCardWrap;
  }

  function handleUpdate(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    setCurrentTask(
      toDoList.find((item) => item.id === event.target.id) ?? null
    );
    setOpenModal(true);
  }

  function handleClose() {
    setOpenModal(false);
    setCurrentTask(null);
  }

  return (
    <Grid item xs={3}>
      <Card
        id={titleList}
        className={style.wrap}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => onDropTask(event)}
      >
        <CardHeader title={titleList} className={style.titleCard} />
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
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <InputTaskMenu visibleButton={true} setPriority={setPriority} />
              </InputAdornment>
            ),
          }}
        ></TextField>

        <FormGroup className={style.taskWrap}>
          {toDoList.map((task) => {
            return (
              <Card
                className={getClassNameForCard(task)}
                key={task.id}
                id={task.id}
                draggable={!task.fulfillment}
                onDragStart={(event) => {
                  event.dataTransfer.setData('id', event.target.id);
                }}
              >
                <Checkbox
                  checked={task.fulfillment}
                  onClick={() => updateTaskFulfillment(task)}
                />
                <Typography
                  className={style.taskCardContent}
                  id={task.id}
                  onClick={(event) => handleUpdate(event)}
                >
                  {task.content}
                </Typography>
                <TaskMenu task={task} />
              </Card>
            );
          })}
        </FormGroup>
        <ButtonCustom onClick={addTask} variant='contained' text='Добавить задачу' className={style.btn}/>
      </Card>
      {currentTask && (
        <TaskModalWindow
          task={currentTask}
          open={openModal}
          onClose={handleClose}
        />
      )}
    </Grid>
  );
}

export default CardList;
