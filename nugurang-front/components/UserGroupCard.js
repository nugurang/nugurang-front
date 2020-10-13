import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';


const styles = theme => ({
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
  },
  card: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0px',
    padding: '0px',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: 300,
  },
  cardContentTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
  },
  iconButton: {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 36,
    height: '40px',
    width: '40px'
  },
});


function UserGroupCard(props) {

    const { classes } = props

    return (
      <React.Fragment>
        <CssBaseline />
        <Box className={classes.box}>
          <Card variant="outlined">
            <CardActionArea>
              <CardContent>
                <Grid container>
                  <Grid item container alignItems="center" direction="row" justify="flex-start">
                    <Grid item xs justify="flex-start">
                      <Typography className={classes.cardTitleTypography}>
                        {props.card.title}
                      </Typography>
                      <Typography className={classes.cardContentTypography}>
                        {props.card.content}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <AvatarGroup max={3}>
                        {props.card.users.map(user => (
                          <Avatar alt={user.name} src={user.image} />
                        ))}
                      </AvatarGroup>
                    </Grid>
                    <Grid item align="right">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddCircleIcon className={classes.iconButton} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </React.Fragment>
    );
}

UserGroupCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserGroupCard);