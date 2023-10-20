import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Task } from "../../store/types/types";
import { cardListSlice } from "../../store/cardListSlice/cardListSlice";

interface TaskMenuProps {
    task: Task
}

function TaskMenu({ task }: TaskMenuProps) {
    const dispatch = useAppDispatch();
    const { deleteTask } = cardListSlice.actions;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = () => {
    dispatch(deleteTask(task));
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        // onClose={handleDelete}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleDelete}>Редактировать</MenuItem> */}
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </div>
  );
}

export default TaskMenu;
