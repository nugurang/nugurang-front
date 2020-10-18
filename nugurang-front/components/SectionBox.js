import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  margin: {
    margin: '0rem 0rem 2rem 0rem',
  },
  box: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0rem',
    padding: '0.5rem',
    variant: 'outlined',
  },
  borderlessBox: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 5,
    margin: '0rem',
    padding: '0.5rem',
    variant: 'outlined',
  },
}));


export default function SectionBox({ children, titleBar, border=true }) {
  const classes = useStyles();
  let key = 0;
  return (
    <Box className={classes.margin}>
      {titleBar || null}
      <Box className={border ? classes.box : classes.borderlessBox}>
        {[children].flat().map((child) => <div key={++key}>{child}</div>)}
      </Box>
    </Box>
  );
}