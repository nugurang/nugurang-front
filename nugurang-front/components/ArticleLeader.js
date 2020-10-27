import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BaseImage from './BaseImage';
import StatCounterBox from './StatCounterBox';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '2.5rem',
    width: '2.5rem',
  },
  authorTypography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  titleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 26,
    fontWeight: 500,
    overflow: "hidden",
    margin: "0.5rem",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  contentTypography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 300,
    overflow: "hidden",
    margin: "0.5rem",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export default function ArticleLeader({ article, like, topic, view, vote, onClick="null" }) {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <Box display={article.image ? "block" : "none"}>
        <BaseImage
          image={article.image}
          imageTitle={article.title}
        />
      </Box>
      <Accordion variant="outlined" defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center">
            <Grid item>
              <Avatar className={classes.avatar}
                alt={article.user.name}
                src={article.user.avatar}
                variant="circle"
              />
            </Grid>
            <Grid item xs>
              <Box display={article.user ? "block" : "none"}>
                <Typography className={classes.authorTypography}>
                  {article.user.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={article.title ? "block" : "none"}>
                <Typography className={classes.titleTypography}>
                  {article.title}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs>
              <Typography className={classes.contentTypography}>
                {article.content}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <StatCounterBox topic={topic} view={view} like={like} vote={vote} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}