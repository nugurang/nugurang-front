import React from 'react';
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

export default function ArticleLeader({ article, like, topic, view, vote, onClick="null" }) {
  return (
    <Box>
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
              <Avatar
                alt={article.user.name}
                src={article.user.image ? article.user.image.address : null}
                variant="circle"
              />
            </Grid>
            <Grid item xs>
              <Box display={article.user ? "block" : "none"}>
                <Typography variant="subtitle1">{article.user.name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display={article.title ? "block" : "none"}>
                <Typography variant="h6">
                  {article.title}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography variant="body1">{article.content}</Typography>
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