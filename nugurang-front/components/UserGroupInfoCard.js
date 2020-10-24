import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(() => ({
  avatarGroup: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
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
    wordWrap: "break-word",
  },
  cardSecondaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 300,
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


export default function UserGroupInfoCard({ primary, secondary, title, users }) {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardContent>
          <Grid container alignItems="center" direction="row" justify="flex-start">
            <Grid item xs>
              <Typography className={classes.cardTitleTypography}>
                {title}
              </Typography>
              <Box display={primary ? "block" : "none"}>
                <Typography className={classes.cardPrimaryTypography}>
                  {primary}
                </Typography>
              </Box>
              <Box display={secondary ? "block" : "none"}>
                <Typography className={classes.cardSecondaryTypography}>
                  {secondary}
                </Typography>
              </Box>
            </Grid>
            <Box display={users ? "block" : "none"}>
              <Grid container alignItems="center" direction="row" justify="flex-end">
                <Grid item align="right">
                  <AvatarGroup className={classes.avatarGroup} max={3} spacing="small">
                    {users.map(user => (
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}