import CardList from "../../components/cardList/cardList";
import {Grid} from "@mui/material";
import style from './style.module.css';
import {useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import { DateFormat } from "../../store/types/types";

const currentDate = new Date();

function MainPage() {
    const { toDoList } = useAppSelector((state) => state.cardList);

    const [today, setToday] = useState<DateFormat>({ day: 0, month: 0, year: 0 });

    useEffect(() => {
        setToday({
            day: currentDate.getDate(),
            month: currentDate.getMonth()+1,
            year: currentDate.getFullYear()
        });
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} className={style.wrap}>
                <CardList titleList="Сегодня" toDoList={toDoList.filter(item => item.date.day === today.day)} />
                <CardList titleList="Завтра" toDoList={toDoList.filter(item => item.date.day === today.day+1)} />
            </Grid>
        </Grid>
    );
}

export default MainPage;