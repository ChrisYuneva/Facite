import {Button, Card, Checkbox, FormControlLabel, FormGroup, Grid, Typography} from "@mui/material";
import style from './style.module.css';

interface CardListProps {
    titleList: string
}

/**
 * id = 'today' || 'to'
 * title
 * list
 * createNewItem (id) => void
 * @param titleList
 * @constructor
 */

function CardList({titleList}: CardListProps) {
    return (
        <Grid item xs={3}>
            <Card id={titleList} className={style.wrap}>
                <Typography variant='h5' textAlign='center'>{titleList}</Typography>
                <Card sx={{backgroundColor: 'grey'}}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    </FormGroup>
                </Card>
                <Button>Добавить задачу</Button>
            </Card>
        </Grid>
    );
}

export default CardList;