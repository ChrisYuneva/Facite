import style from './style.module.css';
import { Alert } from '@mui/material';

interface AlertCustomProps {
  alert: string;
}

function AlertCustom({ alert }: AlertCustomProps) {
  return (
    <Alert severity='error' className={style.alert}>
      {alert}
    </Alert>
  );
}

export default AlertCustom;
