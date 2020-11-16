import { useRouter } from 'next/router';
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { NO_THREAD_IMAGE_ADDRESS } from '../config';
import BaseImage from './BaseImage';
import StatCounterBox from './StatCounterBox';

export default function ArticleLeader({ article, like, topic, view, vote }) {
  const router = useRouter();
  return (
    <Box>
      <BaseImage
        image={article.image ? article.image : NO_THREAD_IMAGE_ADDRESS}
        imageTitle={article.title ? article.title : null}
      />
      <Accordion variant="outlined" defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center">
            <div onClick={() => router.push(`/user/${article.user.id}`)}>
              <Grid item>
                <Avatar
                  alt={article.user.name}
                  src={article.user.image ? article.user.image.address : null}
                  variant="circle"
                  >
                    {article.user.name.charAt(0).toUpperCase()}
                  </Avatar>
              </Grid>
            </div>
            <div onClick={() => router.push(`/user/${article.user.id}`)}>
              <Grid item xs>
                <Box display={article.user ? "block" : "none"}>
                  <Typography variant="subtitle1">{article.user.name}</Typography>
                </Box>
              </Grid>
            </div>
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