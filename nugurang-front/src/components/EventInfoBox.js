import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BaseImage from './BaseImage';


export default function EventInfoBox({ event }) {
  return (
    <Box>
      <Box display={event.images ? "block" : "none"}>
        <BaseImage
          image={event.images ? event.images[0].address : null}
          imageTitle={event.title}
        />
      </Box>
      <Accordion variant="outlined" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography variant="h5" gutterBottom>{event.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container alignItems="flex-start" spacing={1}>
            <Grid item>
              <Typography variant="body1">
                {event.eventStart}
                {"~"}
              </Typography>
              <Typography variant="body1">
                {event.eventEnd}
              </Typography>
            </Grid>
            <Grid item flexGrow={1}>
              <Typography variant="body1">{event.content}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}