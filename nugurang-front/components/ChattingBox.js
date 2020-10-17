import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  avatar: {
    fontSize: 24,
    height: '50px', 
    margin: '0px',
    width: '50px'
  },
  box: {
    margin: '5px',
    padding: '0px',
  },
  list: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  nameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    margin: '0px 0px',
    wordWrap: "break-word",
  },
  contentTypography: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0px 55px',
    padding: '5px',
    wordWrap: "break-word",
  },
};


function ChattingBox(props) {
  const { classes } = props;
  return (
    <>
      <Box className={classes.box}>
        {props.chats.map(chat => (
          <>
            <Grid container spacing={2} alignItems="center" alignments="flex-start" direction={chat.isMyChat ? "row-reverse" : "row"} justify="flex-start">
              <Grid item align="left">
                <div key={chat.id}>
                  <Avatar className={classes.avatar}
                    alt={chat.name}
                    src={chat.image}
                  />
                </div>
              </Grid>
              <Grid item xs={8}>
                <Grid container>
                  <Grid item align="left">
                    <div key={chat.id}>
                      <Typography className={classes.nameTypography}>
                        {chat.name}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div key={chat.id}>
              <Typography className={classes.contentTypography} align="left">
                {chat.content}
              </Typography>
            </div>
          </>
        ))}
      </Box>
    </>
  );
}

ChattingBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChattingBox);






