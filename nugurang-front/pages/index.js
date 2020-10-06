import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InboxIcon from '@material-ui/icons/Inbox';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import StarsIcon from '@material-ui/icons/Stars';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    backgroundImage: 'require("/favicon.png")',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  card_title: {
    alignSelf: "end",
    textAlign: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  favicon: {
    height: 0,
    paddingTop: '100%', // 1:1
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}



const cards = [1, 2, 3, 4];


function TopTitle() {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={5} />
      <Grid item xs={2}>
        <CardMedia
          className={classes.favicon}
          image="/static/images/favicon.png"
          title="Contemplative Reptile"
        />
      </Grid>
      <Grid item xs={5} />
    </Grid>
  );
}

function ShortcutButton() {
 const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardActions>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="/static/images/competition.jpg"
                        title="Competition"
                      />
                      <Typography align="center">
                        Competition
                      </Typography>
                    </CardActionArea>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardActions>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="/static/images/study.jpg"
                        title="Study"
                      />
                      <Typography align="center">
                        Study
                      </Typography>
                    </CardActionArea>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardActions>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="/static/images/hobby.jpg"
                        title="Hobby"
                      />
                      <Typography align="center">
                        Hobby
                      </Typography>
                    </CardActionArea>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Card variant="outlined">
                  <CardActions>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="/static/images/team.jpg"
                        title="Team"
                      />
                      <Typography align="center">
                        Team
                      </Typography>
                    </CardActionArea>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} align="right">
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<StarsIcon />}
                >
                  More
                </Button>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function HotArticles() {
 const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>

            <Grid container spacing={2}>
              <Grid item xs={12}>

                <Typography component="h1" variant="h6">
                  Hot articles
                </Typography>

                <Card variant="outlined">
                  <CardContent>

                    <List>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <StarsIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                      </ListItem>
                      <Divider />
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <StarsIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Work" secondary="Jan 7, 2014" />
                      </ListItem>
                      <Divider />
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            <StarsIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Vacation" secondary="July 20, 2014" />
                      </ListItem>
                    </List>

                  </CardContent>
                </Card>

              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function RecentComps() {
 const classes = useStyles();
  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                      <Typography component="h1" variant="h6">
                          Recent comps
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="/static/images/article_01.jpg"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Comp name
                              </Typography>
                              <Typography>
                                Sample text.
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary">
                                View
                              </Button>
                              <Button size="small" color="primary">
                                Star
                              </Button>
                            </CardActions>
                          </CardActionArea>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="/static/images/article_02.jpg"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Comp name
                              </Typography>
                              <Typography>
                                Sample text.
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary">
                                View
                              </Button>
                              <Button size="small" color="primary">
                                Star
                              </Button>
                            </CardActions>
                          </CardActionArea>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="/static/images/article_03.jpg"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Comp name
                              </Typography>
                              <Typography>
                                Sample text.
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary">
                                View
                              </Button>
                              <Button size="small" color="primary">
                                Star
                              </Button>
                            </CardActions>
                          </CardActionArea>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image="/static/images/article_04.jpg"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Comp name
                              </Typography>
                              <Typography>
                                Sample text.
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary">
                                View
                              </Button>
                              <Button size="small" color="primary">
                                Star
                              </Button>
                            </CardActions>
                          </CardActionArea>
                        </Card>
                      </Grid>

                      <Grid item xs={12} align="right">
                        <Button
                          variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<StarsIcon />}
                        >
                          More
                        </Button>
                      </Grid>
                    </Grid>
                </Grid>
              </Grid>

            </CardContent>
          </Card>
      </Grid>
    </Grid>
  );
}


export default function Home() {
  const classes = useStyles();
  return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TopTitle />
            </Grid>

            <Grid item xs={12}>
              <ShortcutButton />
            </Grid>

            <Grid item xs={12}>
              <HotArticles />
            </Grid>

            <Grid item xs={12}>
              <RecentComps />
            </Grid>

          </Grid>
        </div>

      </Container>
  );
}
