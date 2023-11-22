import { Backdrop, CircularProgress } from '@mui/material';
import { mainColor } from '../../utils/utils';

type LoadingProps = {
  isLoading: boolean;
};

function Loader({ isLoading }: LoadingProps) {
  return (
    <Backdrop
      sx={{ color: mainColor, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color='inherit' size={'75px'} />
    </Backdrop>
  );
}

export default Loader;
