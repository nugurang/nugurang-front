import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from'@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  margin: {
  	align: "center",
    margin: "2rem",
  },
}));

export default function NoContentsBox() {
  const classes = useStyles();
  return (
    <Box className={classes.margin}>
      <Typography align="center" variant="h6">
        No contents :(
      </Typography>
    </Box>
  );
}
