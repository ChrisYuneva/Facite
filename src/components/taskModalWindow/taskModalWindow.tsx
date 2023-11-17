import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';
import { Task } from '../../store/types/types';
import style from './style.module.css';
import InputTaskMenu from '../inputTaskMenu/inputTaskMenu';

export interface TaskModalWindowProps {
  open: boolean;
  task: Task;
  onClose: () => void;
}

function TaskModalWindow({ open, task, onClose }: TaskModalWindowProps) {
  const dispatch = useAppDispatch();
  const { update, deleteTask } = cardListSlice.actions;
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  function save() {
    if (currentTask) {
      dispatch(update(currentTask));
    }
    setCurrentTask(null);
    onClose();
  }

  function handleDelete() {
    dispatch(deleteTask(task));
    setCurrentTask(null);
    onClose();
  }

  return (
    <>
      {currentTask && (
        <Dialog open={open} onClose={onClose}>
          <DialogContent className={style.dialogContent}>
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCurrentTask({
                  ...currentTask,
                  content: event.target.value,
                });
              }}
              defaultValue={task.content}
              id='outlined-basic'
              label='Нужно...'
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <InputTaskMenu
                      visibleButton={true}
                      task={currentTask}
                      setCurrentTask={setCurrentTask}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <>
              <Button onClick={save}>Сохранить</Button>
              <Button color='error' onClick={handleDelete}>
                Удалить
              </Button>
            </>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default TaskModalWindow;
