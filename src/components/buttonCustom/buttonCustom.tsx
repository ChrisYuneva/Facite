import { Button } from '@mui/material';
interface ButtonProps {
  text: string;
  variant: 'text' | 'outlined' | 'contained';
  className?: string;
  onClick: () => void;
}

function ButtonCustom({ text, variant, className, onClick }: ButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} className={className}>
      {text}
    </Button>
  );
}

export default ButtonCustom;
