import Grid from '@material-ui/core/Grid';
import Typography from'@material-ui/core/Typography';

export default function NoContentsBox() {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Typography align="center" variant="h6">
          No contents :(
        </Typography>
      </Grid>
    </Grid>
  );
}
