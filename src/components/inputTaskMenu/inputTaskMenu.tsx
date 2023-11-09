import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
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
import AdjustIcon from '@mui/icons-material/Adjust';

interface InputTaskMenuProps {
  task?: Task;
  setPriority?: React.Dispatch<React.SetStateAction<Priority>>;
  visibleButton: boolean;
}

function InputTaskMenu({
  task,
  visibleButton = false,
  setPriority,
}: InputTaskMenuProps) {
  const dispatch = useAppDispatch();
  const { update } = cardListSlice.actions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handlePriorityUpdate(priority: Priority) {
    if (task) {
      dispatch(update({ ...task, priority }));
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
      {visibleButton && (
        <IconButton
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
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
