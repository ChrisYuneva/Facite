import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { Task } from '../../store/types/types';
import { cardListSlice } from '../../store/cardListSlice/cardListSlice';
import TaskModalWindow from '../taskModalWindow/taskModalWindow';

interface TaskMenuProps {
  task: Task;
}

function TaskMenu({ task }: TaskMenuProps) {
  const dispatch = useAppDispatch();
  const { deleteTask } = cardListSlice.actions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleDelete() {
    dispatch(deleteTask(task));
    setAnchorEl(null);
  }

  function handleUpdate() {
    setOpenModal(true);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
    setOpenModal(false);
  }

  return (
    <>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleUpdate}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
      <TaskModalWindow task={task} open={openModal} onClose={handleClose} />
    </>
  );
}

export default TaskMenu;
