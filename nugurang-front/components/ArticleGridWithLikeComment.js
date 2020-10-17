import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27';

const styles = {
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '15px',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '10px',
    padding: '10px 30px',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    wordWrap: "break-word",
    overflow: "hidden", 
    textOverflow: "ellipsis",
  },
  card: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    padding: '0px',
    variant: 'outlined',
    width: '100%',
  },
  cardMedia: {
    height: '100px',
    objectFit: 'cover',
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden", 
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  chip: {
    height: "20px",
    width: "auto",
    margin: "0px 10px",
  },
  iconLikeComment: {
    height: "20px",
    width: "20px",
    margin: "5px -10px 0px -10px",
  },
};


function ArticleGridWithLikeComment(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box}>
        <Grid container spacing={2} alignItems="stretch" justify="flex-start">
          {props.articles.map(article => (
            <Grid key={article.id} item xs={12} sm={6}>
              <Card key={article.id} className={classes.card} variant="outlined">
                <CardActionArea>
                  <div key={article.id}>
                    <CardMedia className={classes.cardMedia}
                      image={article.image || DEFAULT_IMAGE}
                      title={article.title}
                    />
                  </div>
                  <CardContent>
                    <div key={article.id}>
                      <Typography noWrap className={classes.cardTitleTypography}>
                        {article.title}
                      </Typography>
                    </div>
                    <Grid container spacing={2} alignItems="center" direction="row" justify="flex-end">

                      <div key={article.id}>
                        {
                          article.chip ?
                          (
                            <Grid item align="right">
                              <Chip className={classes.chip} label={article.chip} />
                            </Grid>
                          ) : null
                        }
                      </div>

                      <Grid item align="right">
                        <ThumbUpIcon className={classes.iconLikeComment} />
                      </Grid>
                      <Grid item align="right">
                        <div key={article.id}>
                          <Typography className={classes.typographyLikeComment}>{article.like}</Typography>
                        </div>
                      </Grid>
                      <Grid item align="right">
                        <ChatIcon className={classes.iconLikeComment} />
                      </Grid>
                      <Grid item align="right">
                        <div key={article.id}>
                          <Typography className={classes.typographyLikeComment}>{article.comment}</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default withStyles(styles)(ArticleGridWithLikeComment);
