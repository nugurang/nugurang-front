import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '30px',
    width: '30px',
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  hr: {
    backgroundColor: "gray",
    height: 2,
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    fontWeight: 300,
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
};

function SectionTitleBox({ classes, children, icon, title }) {
  let key = 0;
  return (
    <Box className={classes.box}>
      <Grid container spacing={2} alignItems="center" justify="space-between">
        <Grid item>
          <Grid container spacing={2} alignItems="center" justify="flex-start">
            <Grid item>
              <Avatar className={classes.avatar}>
                {icon}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography className={classes.typography}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="flex-end">
            {[children].flat().map((child) => <Grid item key={++key}>{child}</Grid>)}
          </Grid>
        </Grid>
      </Grid>
      <hr className={classes.hr} />
    </Box>
  );
}

export default withStyles(styles)(SectionTitleBox);
