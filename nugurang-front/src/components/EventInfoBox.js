import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={2} alignItems="center" justify="flex-start">
            <Grid item>
              <Typography variant="h5">{event.title}</Typography>
              <Box display={dense ? "none" : "block"}>
                <Typography variant="body1">
                  {"Start: "}
                  {event.eventStart}
                  {", End: "}
                  {event.eventEnd}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography variant="body1">{event.content}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}