import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 24,
    height: '5rem',
    margin: '0rem',
    width: '5rem'
  },
  box: {
    margin: '0.5rem',
    padding: '0rem',
  },
  list: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem',
    variant: 'outlined',
  },
  nameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    margin: '0rem',
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  contentTypography: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0rem 5.5rem',
    padding: '0.5rem',
    wordWrap: "break-word",
  },
}));


export default function ChattingBox(props) {
  const classes = useStyles();
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