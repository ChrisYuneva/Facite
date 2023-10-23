import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { cardListSlice } from '../../store/cardListSlice/cardListSlice';
import { Task } from '../../store/types/types';
import style from './style.module.css';

export interface TaskModalWindowProps {
  open: boolean;
  task: Task;
  onClose: () => void;
}

function TaskModalWindow({ open, task, onClose }: TaskModalWindowProps) {
  const dispatch = useAppDispatch();
  const { update, deleteTask } = cardListSlice.actions;

  const [updatedContent, setUpdatedContent] = useState<string>('');

  function save() {
    dispatch(update({ ...task, content: updatedContent }));
    onClose();
  }

  function handleDelete() {
    dispatch(deleteTask(task));
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={style.dialogContent}>
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedContent(event.target.value);
          }}
          defaultValue={task.content}
          id='outlined-basic'
          label='Нужно...'
          variant='outlined'
        />
        <>
          <Button onClick={save}>Сохранить</Button>
          <Button color='error' onClick={handleDelete}>Удалить</Button>
        </>
      </DialogContent>
    </Dialog>
  );
}

export default TaskModalWindow;
