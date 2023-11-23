import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Priority, Task } from '../../store/types/types';
import { cardListSlice } from '../../store/slices/cardListSlice/cardListSlice';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AdjustIcon from '@mui/icons-material/Adjust';
import style from './style.module.css';
import { updateTaskToDB } from '../../firebase/firebase';

interface InputTaskMenuProps {
  visibleButton: boolean;
  task?: Task;
  setCurrentTask?: React.Dispatch<React.SetStateAction<Task | null>>;
  setPriority?: React.Dispatch<React.SetStateAction<Priority>>;
}

function InputTaskMenu({
  task,
  visibleButton = false,
  setCurrentTask,
  setPriority,
}: InputTaskMenuProps) {
  const { toDoList, dbId } = useAppSelector((state) => state.cardList);

  const dispatch = useAppDispatch();
  const { update } = cardListSlice.actions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [classNameBtn, setClassNameBtn] = useState(task?.priority ?? '');

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function changeClassNameBtn(priority: Priority) {
    if (priority === 'urgently') {
      setClassNameBtn(`${style.urgently}`);
    }
    if (priority === 'veryUrgently') {
      setClassNameBtn(`${style.veryUrgently}`);
    }
    if (classNameBtn !== '' && priority === 'default') {
      setClassNameBtn('');
    }
  }

  function handlePriorityUpdate(priority: Priority) {
    if (task) {
      const updateTask = { ...task, priority };
      if (setCurrentTask) {
        setCurrentTask({ ...task, priority });
      } else {
        dispatch(update({ ...task, priority }));
        updateTaskToDB(
          toDoList.map((item) => {
            if (item.id === updateTask.id) {
              return updateTask;
            }

            return item;
          }), 
          dbId);
      }

      changeClassNameBtn(priority);
    } else {
      if (setPriority) {
        setPriority(priority);

        changeClassNameBtn(priority);
      }
    }

    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    setClassNameBtn('');
  }, [toDoList.length]);

  return (
    <>
      {visibleButton && (
        <IconButton
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className={classNameBtn}
        >
          <ErrorOutlineIcon />
        </IconButton>
      )}
      {!visibleButton && (
        <>
          <ListItemIcon>
            <ErrorOutlineIcon />
          </ListItemIcon>
          <Typography onClick={handleClick}>Приоритетность</Typography>
        </>
      )}

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handlePriorityUpdate('default')}>
          <ListItemIcon>
            <AdjustIcon />
          </ListItemIcon>
          <ListItemText>Не срочно</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handlePriorityUpdate('urgently')}>
          <ListItemIcon>
            <ErrorOutlineIcon />
          </ListItemIcon>
          <ListItemText>Срочно</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handlePriorityUpdate('veryUrgently')}>
          <ListItemIcon>
            <NewReleasesIcon />
          </ListItemIcon>
          <ListItemText>Очень срочно</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default InputTaskMenu;
