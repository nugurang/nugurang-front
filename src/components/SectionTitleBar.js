import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(() => ({
  margin: {
    margin: '0.5rem 0rem',
  },
  hr: {
    borderColor: 'rgba(0, 0, 0, 0.25)',
    height: '0.1rem',
    margin: '0.5rem',
  },
}));


export default function SectionTitleBar({ avatar, children, icon, title, backButton=false, backButtonLink=null, bottomBar=false, circleIcon=true }) {
  const router = useRouter();
  const classes = useStyles();
  let key = 0;
  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="center" justify="flex-start">
        <Grid item>
          <Box display={backButton ? "block" : "none"}>
            <IconButton
              aria-label="back"
              edge="start"
              onClick={() => {backButtonLink ? router.push(backButtonLink) : router.back()}}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box display={avatar && !icon ? "block" : "none"}>
            <Avatar
              alt={title || null}
              src={avatar}
              variant={circleIcon ? "circle" : "square"}
            />
          </Box>
          <Box display={icon && !avatar ? "block" : "none"}>
            {icon}
          </Box>
        </Grid>
        <Grid item xs>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Box display={children ? "block" : "none"}>
            <Grid container alignItems="flex-end">
              {[children].flat().map((child) => <Grid item key={++key}>{child}</Grid>)}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box display={bottomBar ? "block" : "none"}>
        <Divider />
      </Box>
    </div>
  );
}