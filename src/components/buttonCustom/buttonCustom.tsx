import { Button } from '@mui/material';

import style from './style.module.css';

interface ButtonProps {
  text: string;
  variant: 'text' | 'outlined' | 'contained';
  onClick: () => void;
}

function ButtonCustom({ text, variant, onClick }: ButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} className={style.btn}>
      {text}
    </Button>
  );
}

export default ButtonCustom;
