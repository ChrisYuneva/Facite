import {
  Button,
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
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { cardListSlice } from '../../store/cardListSlice/cardListSlice';
import { useState } from 'react';
import { Priority, Task } from '../../store/types/types';
import TaskMenu from '../taskMenu/taskMenu';
import { getCurrentWeek, getUpcomingMonday } from '../../utils/utils';
import InputTaskMenu from '../inputTaskMenu/inputTaskMenu';
import TaskModalWindow from '../taskModalWindow/taskModalWindow';

interface CardListProps {
  titleList: string;
  toDoList: Task[];
}

const currentDate = new Date();

function CardList({ titleList, toDoList }: CardListProps) {
  const [content, setContent] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [priority, setPriority] = useState<Priority>('default');
  const [openModal, setOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

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
        case 'Потом':
        return {
          day: 0,
          month: 0,
          week: 0,
          year: 0,
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
      dispatch(
        add({
          content,
          priority,
          fulfillment: false,
          date: getDate(titleList),
        })
      );
      setContent('');
      setPriority('default');
    }
  }

  function updateTaskFulfillment(task: Task) {
    dispatch(update({ ...task, fulfillment: !task.fulfillment }));
  }

  function onDropTask(event: React.DragEvent<HTMLDivElement>) {
    const currentId = event.dataTransfer.getData('id');
    const currentToDo = allToDoList.find((el) => el.id === currentId);

    dispatch(
      update({
        id: currentToDo?.id,
        content: currentToDo?.content ?? '',
        priority: currentToDo?.priority ?? 'default',
        fulfillment: currentToDo?.fulfillment ?? false,
        date: getDate(event.currentTarget.id),
      })
    );

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
    setCurrentTask(toDoList.find(item => item.id === event.target.id) ?? null);
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
        <Button onClick={addTask}>Добавить задачу</Button>
      </Card>
      {
        currentTask && <TaskModalWindow
          task={currentTask}
          open={openModal}
          onClose={handleClose}
        />
      }
    </Grid>
  );
}

export default CardList;
