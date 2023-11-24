import { Button } from '@mui/material';

import style from './style.module.css';

interface ButtonProps {
  text: string;
  variant: 'text' | 'outlined' | 'contained';
  className?: string;
  onClick: () => void;
}

function ButtonCustom({ text, variant, className, onClick }: ButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} className={`${style.btn} ${className}`}>
      {text}
    </Button>
  );
}

export default ButtonCustom;
