import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import InboxIcon from '@material-ui/icons/Inbox';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import StarsIcon from '@material-ui/icons/Stars';
import Typography from '@material-ui/core/Typography';
import BottomNavBarLayout from '../components/BottomNavBarLayout';
import useStyles from '../components/UseStyles';


const userBriefInfo = {
    id: 1,
    name: "Name",
    image: "",
    bio: "Bio",
  };

const settingItems = [
  {
    id: 1,
    title: "Message",
  },
  {
    id: 2,
    title: "Display",
  },
  {
    id: 3,
    title: "Notification",
  },
  {
    id: 4,
    title: "General",
  },
];


function UserBriefInfo() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={6}>
        <List>
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt={userBriefInfo.name}
                src={userBriefInfo.image}
              />
            </ListItemAvatar>
            <ListItemText primary={userBriefInfo.name} secondary={userBriefInfo.bio} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <List>
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt={userBriefInfo.name}
                src={userBriefInfo.image}
                variant="square"
              />
            </ListItemAvatar>
            <ListItemText primary={userBriefInfo.name} secondary={userBriefInfo.bio} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}


function Setting() {
 const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List>
          {settingItems.map(settingItem => (
            <>
              <ListItem button>
                <ListItemText primary={settingItem.title} />
              </ListItem>
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}


export default function Home() {
  const classes = useStyles();
  return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
         <BottomNavBarLayout>
          <Paper className={classes.paper_background} variant="outlined">

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <UserBriefInfo />
              </Grid>


              <Grid item xs={12}>
                <Paper className={classes.paper_card} variant="outlined">
                  <Setting />
                </Paper>
              </Grid>


            </Grid>
          </Paper>
        </BottomNavBarLayout>
      </Container>
  );
}
