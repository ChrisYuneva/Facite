import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { Priority, Task } from '../../store/types/types';
import { cardListSlice } from '../../store/cardListSlice/cardListSlice';
import TaskModalWindow from '../taskModalWindow/taskModalWindow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

interface InputTaskMenuProps {
  task?: Task;
  setPriority?: React.Dispatch<React.SetStateAction<Priority>>;
}

function InputTaskMenu({ setPriority, task }: InputTaskMenuProps) {
  const dispatch = useAppDispatch();
  const { update } = cardListSlice.actions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handlePriorityUpdate(priority: Priority) {
    if (task) {
      dispatch(update({ ...task, priority: task.priority }));
    } else {
      if (setPriority) {
        setPriority(priority);
      }
    }

    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
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
        <ErrorOutlineIcon />
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
