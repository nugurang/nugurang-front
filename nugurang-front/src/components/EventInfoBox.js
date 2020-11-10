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


export default function EventInfoBox({ event, dense=false }) {
  return (
    <Box>
      <Box display={event.images ? "block" : "none"}>
        <BaseImage
          image={event.images ? event.images[0] : null}
          imageTitle={event.title}
        />
      </Box>
      <Accordion variant="outlined" defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Grid container spacing={2} alignItems="center" justify="flex-start">
            <Grid item>
              <Typography variant="h5" gutterBottom>{event.title}</Typography>
              <Box display={dense ? "none" : "block"}>
                <Grid container alignItems="flex-start" spacing={1}>
                  <Grid item>
                    <AccessTimeIcon style={{ fontSize: 24 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {event.eventStart}
                      {"~"}
                    </Typography>
                    <Typography variant="body1">
                      {event.eventEnd}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container alignItems="flex-start" spacing={1}>
            <Grid item flexGrow={1}>
              <Typography variant="body1">{event.content}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}