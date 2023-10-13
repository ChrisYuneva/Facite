import CardList from "../../components/cardList/cardList";
import {Grid} from "@mui/material";
import style from './style.module.css';

function MainPage() {
    return (
        <Grid container>
            <Grid item xs={12} className={style.wrap}>
                <CardList titleList="Сегодня"/>
                <CardList titleList="Завтра"/>
                <CardList titleList="На следующей неделе"/>
                <CardList titleList="Потом"/>
            </Grid>
        </Grid>
    );
}

export default MainPage;