import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import style from "./style.module.css";
import { useAppDispatch } from "../../hooks/hooks";
import { cardListSlice } from "../../store/cardListSlice/cardListSlice";
import { useState } from "react";
import { Task } from "../../store/types/types";
import TaskMenu from "../taskMenu/taskMenu";

interface CardListProps {
  titleList: string;
  toDoList: Task[];
}

const currentDate = new Date();

function CardList({ titleList, toDoList }: CardListProps) {
  const [content, setContent] = useState<string>("");

  const dispatch = useAppDispatch();
  const { add, update } = cardListSlice.actions;

  function getDate() {
    switch (titleList) {
      case "Сегодня":
        return {
          day: currentDate.getDate(),
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        };
      case "Завтра":
        return {
          day: currentDate.getDate() + 1,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        };
      default:
        return {
          day: 0,
          month: 0,
          year: 0,
        };
    }
  }

  function addTask() {
    dispatch(add({ content: content, fulfillment: false, date: getDate() }));
    setContent("");
  }
  
  function updateTaskFulfillment(task: Task) {
    dispatch(update({ ...task, fulfillment: !task.fulfillment }));
  }

  return (
    <Grid item xs={3}>
      <Card id={titleList} className={style.wrap}>
        <CardHeader
          title={titleList}
          // component={Typography}
          className={style.titleCard}
        ></CardHeader>
        <TextField
          value={content}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContent(event.target.value);
          }}
          className={style.inputTask}
          id="outlined-basic"
          label="Нужно..."
          variant="outlined"
        />

        <FormGroup className={style.taskWrap}>
          {toDoList.map((task) => {
            return (
              <Card className={style.taskCardWrap}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={task.fulfillment}
                      onClick={() => updateTaskFulfillment(task)}
                    />
                  }
                  label={task.content}
                  id={task.id}
                  sx={{ marginBottom: "8px", marginLeft: 0 }}
                  key={task.content}
                  className={task.fulfillment ? style.done : ''}
                />
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
