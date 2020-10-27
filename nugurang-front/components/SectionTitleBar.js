import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: "transparent",
    color: "black",
    height: '2rem',
    width: '2rem',
  },
  backButton: {
    backgroundColor: "transparent",
    color: "black",
  },
  box: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  hr: {
    borderColor: 'rgba(0, 0, 0, 0.25)',
    height: '0.1rem',
    margin: '0.5rem',
  },
  iconButton: {
    color: 'black',
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export default function SectionTitleBar({ avatar, circleIcon, children, icon, title, avatarDescription=null, backButton=false, backButtonLink=null, bottomBar=false }) {
  const router = useRouter();
  const classes = useStyles();
  let key = 0;
  return (
    <Box className={classes.box}>
      <Grid container alignItems="center" justify="flex-start">
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Box display={backButton ? "block" : "none"}>
              <IconButton
                className={classes.backButton}
                edge="start"
                onClick={() => {backButtonLink ? router.push(backButtonLink) : router.back()}}
                color="inherit"
                aria-label="back"
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>

            <Box display={avatar && !icon ? "block" : "none"}>
              <Avatar className={classes.avatar}
                alt={avatarDescription || null}
                src={avatar}
                variant={circleIcon ? "circle" : "square"}
              />
            </Box>
            <Box display={icon && !avatar ? "block" : "none"}>
              <IconButton className={classes.iconButton}>
                {icon}
              </IconButton>
            </Box>

          </Grid>
          <Grid item xs>
            <Box>
              <Typography className={classes.typography}>
                {title}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box display={children ? "block" : "none"}>
              <Grid container alignItems="flex-end">
                {[children].flat().map((child) => <Grid item key={++key}>{child}</Grid>)}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box display={bottomBar ? "block" : "none"}>
        <hr className={classes.hr} />
      </Box>
    </Box>
  );
}