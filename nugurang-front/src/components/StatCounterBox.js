import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImageIcon from '@material-ui/icons/Image';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';


const useStyles = makeStyles(() => ({
  chip: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 400,
    height: "1.5rem",
    width: "auto",
    margin: "0rem 0.25rem",
  },
  icon: {
    height: "1.25rem",
    width: "1.25rem",
    margin: "0.25rem 0.25rem 0rem 0.5rem",
  },
  countTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  chipCompact: {
    fontFamily: "Ubuntu",
    fontSize: 12,
    fontWeight: 400,
    height: "1.25rem",
    width: "auto",
    margin: "0rem -0.25rem 0rem 0.25rem",
  },
  iconCompact: {
    height: "1rem",
    width: "1rem",
    margin: "0.25rem 0.25rem 0rem 0.5rem",
  },
  countTypographyCompact: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


function IconCounter({ compact, count, icon }) {
  const classes = useStyles();
  return (
    <>
      <Grid item align="right">
        {icon}
      </Grid>
      <Grid item align="right">
        <Typography className={compact ? classes.countTypographyCompact : classes.countTypography}>
          {count}
        </Typography>
      </Grid>
    </>
  );
}

export default function StatCounterBox({ commentCount, image, upCount, topic, view, vote, compact=false }) {
  const classes = useStyles();
  return (
    <>
      <Box display={compact ? "block" : "none"}>
        <Grid container spacing={1} alignItems="center" direction="row" justify="flex-end">
          <Grid item>
            { topic ? <Chip className={classes.chipCompact} label={topic} /> : null }
          </Grid>
          <Grid container spacing={0} direction="row" justify="flex-end">
            { image ? <IconCounter compact={compact} count=" " icon=<ImageIcon className={classes.iconCompact} /> /> : null }
            { view ? <IconCounter compact={compact} count={view} icon=<VisibilityIcon className={classes.iconCompact} /> /> : null }
            { typeof(upCount) === 'number' && <IconCounter compact={compact} count={upCount} icon=<FavoriteIcon className={classes.iconCompact} /> /> }
            { vote ? <IconCounter compact={compact} count={vote} icon=<ThumbUpIcon className={classes.iconCompact} /> /> : null }
            { commentCount ? <IconCounter compact={compact} count={commentCount} icon=<ChatIcon className={classes.iconCompact} /> /> : null }
          </Grid>
        </Grid>
      </Box>
      <Box display={compact ? "none" : "block"}>
        <Grid container spacing={0} alignItems="center" direction="row" justify="flex-end">
          { topic ? <Chip className={classes.chip} label={topic} /> : null }
          { image ? <IconCounter compact={compact} count=" " icon=<ImageIcon className={classes.icon} /> /> : null }
          { view ? <IconCounter compact={compact} count={view} icon=<VisibilityIcon className={classes.icon} /> /> : null }
          { typeof(upCount) === 'number' && <IconCounter compact={compact} count={upCount} icon=<FavoriteIcon className={classes.icon} /> /> }
          { vote ? <IconCounter compact={compact} count={vote} icon=<ThumbUpIcon className={classes.icon} /> /> : null }
          { commentCount ? <IconCounter compact={compact} count={commentCount} icon=<ChatIcon className={classes.icon} /> /> : null }
        </Grid>
      </Box>
    </>
  );
}
