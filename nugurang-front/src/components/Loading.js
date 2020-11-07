import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  circularProgress: {
    color: "primary",
  },
}));

export default function Loading({ circular }) {
  const classes = useStyles();
  return (
  	<Layout>
  	  {
        circular
        ? <Backdrop className={classes.backdrop} open="true"><CircularProgress className={classes.circularProgress} /></Backdrop>
        : <LinearProgress />
      }
  	</Layout>
  );
}
