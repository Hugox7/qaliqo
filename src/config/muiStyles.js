import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    medium: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }
  }));

  export default useStyles;