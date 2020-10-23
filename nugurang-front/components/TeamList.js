import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';

import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles(() => ({
  avatarGroup: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  box: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '1.5rem',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '1rem',
    padding: '1rem 3rem',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  card: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0rem',
    padding: '0rem',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  cardPrimaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  cardSecondaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  iconButton: {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 36,
    height: '2rem',
    width: '2rem'
  },
}));


export default function TeamList({ items }) {
  const classes = useStyles();
  return (
    <List>
      {[items].flat().map((item) => (
        <ListItem key={item.id} alignItems="flex-start" button onClick={item.onClick}>
          <Grid container alignItems="center" direction="row" justify="flex-start">
            <Grid item xs>
              <Typography className={classes.cardTitleTypography}>
                {item.title}
              </Typography>
              <Box display={item.primary ? "block" : "none"}>
                <Typography className={classes.cardPrimaryTypography}>
                  {item.primary}
                </Typography>
              </Box>
              <Box display={item.secondary ? "block" : "none"}>
                <Typography className={classes.cardSecondaryTypography}>
                  {item.secondary}
                </Typography>
              </Box>
            </Grid>
            <Box display={item.users ? "block" : "none"}>
              <Grid container alignItems="center" direction="row" justify="flex-end">
                <Grid item align="right">
                  <AvatarGroup className={classes.avatarGroup} max={3} spacing="small">
                    {item.users.map(user => (
                      <Avatar key={user.id} alt={user.name} src={user.image} />
                    ))}
                  </AvatarGroup>
                </Grid>
                <Grid item align="right">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <AddCircleIcon className={classes.iconButton} />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}