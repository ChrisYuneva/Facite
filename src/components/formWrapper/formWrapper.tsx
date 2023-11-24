import { Box, Card, Grid, Typography } from '@mui/material';
import ButtonCustom from '../buttonCustom/buttonCustom';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

interface FormWrapperProps {
  title: string;
  btnText: string;
  navigateTo: string;
  children: React.ReactNode;
}

function FormWrapper({
  title,
  btnText,
  navigateTo,
  children,
}: FormWrapperProps) {
  const navigate = useNavigate();

  return (
    <Box className={style.container}>
      <Grid container alignItems='center' className={style.wrap}>
        <Card className={style.card}>
          <Typography variant='h4' textAlign='center' className={style.title}>
            {title}
          </Typography>
          {children}
          <ButtonCustom
            text={btnText}
            variant='outlined'
            className={style.btn}
            onClick={() => navigate(navigateTo)}
          />
        </Card>
      </Grid>
    </Box>
  );
}

export default FormWrapper;
