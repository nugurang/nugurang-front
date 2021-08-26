import dayjs from "dayjs";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DayjsUtils from "@date-io/dayjs";
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/core/Slider';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PeopleIcon from '@material-ui/icons/People';

import withAuthServerSide from '../../../utils/withAuthServerSide';
import { mutateToBackend, queryToBackend } from "../../../utils/requestToBackend";
import {
  GetAllThreadMatchTypesQueryBuilder,
  GetThreadQueryBuilder,
  CreateThreadMatchRequestMutationBuilder,
} from '../../../queries/thread';

import BaseSwitch from '../../../components/BaseSwitch';
import EventInfoBox from '../../../components/EventInfoBox';
import Layout from '../../../components/Layout';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const allThreadMatchTypesResult = await queryToBackend({
    context,
    query: new GetAllThreadMatchTypesQueryBuilder().build(),
  });
  const threadResult = await queryToBackend({
    context,
    query: new GetThreadQueryBuilder().withUser().withEvent().withFirstArticle().withArticles().build(),
    variables: {
      id: context.query.thread,
    },
  });

  if (!threadResult.data.getThread) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      allThreadMatchTypes: allThreadMatchTypesResult.data.matchTypes,
      thread: threadResult.data.getThread,
    },
  };
});

function Match({ allThreadMatchTypes, thread }) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(dayjs().add('1', 'day'));
  const [minTeamSize, setMinTeamSize] = useState(2);
  const [maxTeamSize, setMaxTeamSize] = useState(3);
  const [infMaxTeamSize, setInfMaxTeamSize] = useState(false);
  const toggleInfMaxTeamSize = () => {
    setInfMaxTeamSize((prev) => !prev);
  };

  const allThreadMatchTypesRev = {};
  allThreadMatchTypes.forEach(function(matchType){
    allThreadMatchTypesRev[matchType.name] = Number(matchType.id);
  });

  return (
    <Layout>
      <PageTitleBar title="Match" backButton backButtonLink={`/threads/${router.query.id}`} />

      <Grid container>
        <Grid item xs={12} md={6}>
          <SectionBox>
            {
              thread.event
              ? <EventInfoBox event={thread.event} />
              : <></>
            }
          </SectionBox>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionBox titleBar={<SectionTitleBar title="Expire date" icon={<EventAvailableIcon />} />}>
            <MuiPickersUtilsProvider utils={DayjsUtils}>
              <Box display="flex" justifyContent="center">
                <KeyboardDatePicker
                  disablePast
                  margin="normal"
                  label="Select date"
                  format="YYYY-MM-DD"
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <KeyboardTimePicker
                  disablePast
                  margin="normal"
                  label="Select time"
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                  }}
                />
              </Box>
            </MuiPickersUtilsProvider>
          </SectionBox>

          <SectionBox titleBar={<SectionTitleBar title="Minimal team size" icon={<PeopleIcon />} />}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs style={{margin: "2rem 2rem 0rem 2rem"}}>
                <Slider
                  value={minTeamSize}
                  min={2}
                  max={10}
                  step={1}
                  onChange={(event, newValue) => {
                    setMinTeamSize(newValue);
                  }}
                  valueLabelDisplay="on"
                />
              </Grid>
              <Grid item style={{margin: "2rem"}}>
                <Input
                  value={minTeamSize}
                  margin="dense"
                  onChange={(event) => {
                    setMinTeamSize(event.target.value === '' ? '' : Number(event.target.value));
                  }}
                  onBlur = {() => {
                    if (minTeamSize < 2) {
                      setMinTeamSize(2);
                    }
                  }}
                  style={{width: 80}}
                  inputProps={{
                    step: 1,
                    min: 2,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </SectionBox>

          <SectionBox titleBar={<SectionTitleBar title="Maximal team size" icon={<PeopleIcon />} />}>
            <Box display="flex" justifyContent="flex-end">
              <Box mx="2rem"><BaseSwitch label="Set infinite" checked={infMaxTeamSize} onChange={toggleInfMaxTeamSize} /></Box>
            </Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs style={{margin: "2rem 2rem 0rem 2rem"}}>
                <Slider
                  value={maxTeamSize}
                  min={2}
                  max={10}
                  step={1}
                  onChange={(event, newValue) => {
                    setMaxTeamSize(newValue);
                  }}
                  valueLabelDisplay="on"
                  disabled={infMaxTeamSize}
                />
              </Grid>
              <Grid item style={{margin: "2rem"}}>
                <Input
                  value={maxTeamSize}
                  margin="dense"
                  onChange={(event) => {
                    setMaxTeamSize(event.target.value === '' ? '' : Number(event.target.value));
                  }}
                  onBlur = {() => {
                    if (maxTeamSize < 2) {
                      setMaxTeamSize(2);
                    }
                  }}
                  style={{width: 80}}
                  inputProps={{
                    step: 1,
                    min: 2,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                  disabled={infMaxTeamSize}
                />
              </Grid>
            </Grid>
          </SectionBox>

          <SectionBox border={false} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const days = selectedDate.diff(dayjs(), "day");
                    const hours = selectedDate.diff(dayjs(), "hour") % 24;
                    const minutes = selectedDate.diff(dayjs(), "minute") % 60;
                    await mutateToBackend({
                      mutation: new CreateThreadMatchRequestMutationBuilder().build(),
                      variables: {
                        request: {
                          event: thread.event.id,
                          type: allThreadMatchTypesRev["RANDOM"],
                          minTeamSize,
                          maxTeamSize: setInfMaxTeamSize ? null : maxTeamSize,
                          days,
                          hours,
                          minutes
                        }
                      }
                    });
                    router.push(`/match/request/success`);
                  }}
                >
                  <Box align="center">
                    <Button variant="contained" type="submit">Random match</Button>
                  </Box>
                </form>
              </Grid>
              <Grid item xs={12}>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const days = selectedDate.diff(dayjs(), "day");
                    const hours = selectedDate.diff(dayjs(), "hour") % 24;
                    const minutes = selectedDate.diff(dayjs(), "minute") % 60;
                    await mutateToBackend({
                      mutation: new CreateThreadMatchRequestMutationBuilder().build(),
                      variables: {
                        request: {
                          event: thread.event.id,
                          type: allThreadMatchTypesRev["HONOR"],
                          minTeamSize,
                          maxTeamSize:
                          setInfMaxTeamSize ? null : maxTeamSize,
                          days,
                          hours,
                          minutes
                        }
                      }
                    });
                    router.push(`/match/request/success`);
                  }}
                >
                  <Box align="center">
                    <Button variant="contained" type="submit">Honor match</Button>
                  </Box>
                </form>
              </Grid>
              <Grid item xs={12}>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const days = selectedDate.diff(dayjs(), "day");
                    const hours = selectedDate.diff(dayjs(), "hour") % 24;
                    const minutes = selectedDate.diff(dayjs(), "minute") % 60;
                    await mutateToBackend({
                      mutation: new CreateThreadMatchRequestMutationBuilder().build(),
                      variables: {
                        request: {
                          event: thread.event.id,
                          type: allThreadMatchTypesRev["PERSONALITY"],
                          minTeamSize,
                          maxTeamSize: setInfMaxTeamSize ? null : maxTeamSize,
                          days,
                          hours,
                          minutes
                        }
                      }
                    });
                    router.push(`/match/request/success`);
                  }}
                >
                  <Box align="center">
                    <Button variant="contained" type="submit">Personality match</Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </SectionBox>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Match;
