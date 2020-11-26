import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImageIcon from '@material-ui/icons/Image';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';


function IconCounter({ compact, count, icon }) {
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

export default function ArticleStatCounterBox({ article, compact=false, onClickDown=null, onClickStar=null, onClickUp=null }) {
  return (
    <Box style={{margin: "0 0.5rem"}}>
      <Grid container spacing={compact ? 0 : 1} alignItems="center" direction="row" justify="flex-end">
        <Grid item>
          <Box display={article.topic ? "block" : "none"}>
            <Chip label="Test topic" size={compact ? "small" : ""}/>
          </Box>
        </Grid>
        <Grid item>
          <Box display={article.viewCount ? "flex" : "flex"} alignItems="center">
            <IconButton color="default"><VisibilityIcon fontSize={compact ? "small" : ""} /></IconButton>
            <Typography>{article.viewCount}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display={article.upCount ? "flex" : "flex"} alignItems="center">
            <IconButton color="default" onClick={onClickUp}><ThumbUpIcon fontSize={compact ? "small" : ""} /></IconButton>
            <Typography>{article.upCount}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display={article.downCount ? "flex" : "flex"} alignItems="center">
            <IconButton color="default" onClick={onClickDown}><ThumbDownIcon fontSize={compact ? "small" : ""} /></IconButton>
            <Typography>{article.downCount}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display={article.starCount ? "flex" : "flex"} alignItems="center">
            <IconButton color="default" onClick={onClickStar}><FavoriteIcon fontSize={compact ? "small" : ""} /></IconButton>
            <Typography>{article.starCount}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
