import dayjs from "dayjs";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DayjsUtils from "@date-io/dayjs";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PeopleIcon from '@material-ui/icons/People';

import withAuth from '../../../components/withAuth';
import ArticleLeader from '../../../components/ArticleLeader';
import ArticleListItem from '../../../components/ArticleListItem';
import BaseSwitch from '../../../components/BaseSwitch';
import EventInfoBox from '../../../components/EventInfoBox';
import GraphQlError from '../../../components/GraphQlError';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';
import YesNoDialog from '../../../components/YesNoDialog';


const MATCH_TYPES = gql`
  query {
    matchTypes {
      id
      name
    }
  }
`;

const GET_THREAD = gql`
  query GetThread($id: ID!) {
    getThread(id: $id) {
      id
      name
      user {
        id
        name
        image {
          id
          address
        }
      }
      event {
        id
        name
        description
        recruitingStart
        recruitingEnd
        eventStart
        eventEnd
      }
      firstArticle {
        id
        user {
          id
          name
          image {
            id
            address
          }
        }
        title
        content
      }
      getArticles(page: 0, pageSize: 100) {
        id
        user {
          id
          name
          image {
            id
            address
          }
        }
        title
        content
        viewCount
      }
    }
  }
`;


const GET_MATCH_TYPE_BY_NAME = gql`
  query GetMatchTypeByName($name: String!) {
    getMatchTypeByName(name: $name) {
      id
      name
    }
  }
`;


const CREATE_MATCH_REQUEST = gql`
  mutation CreateMatchRequest($request: MatchRequestInput!) {
    createMatchRequest (request: $request) {
      id
    }
  }
`;


function Match() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().add('1', 'day'));
  const [minTeamSize, setMinTeamSize] = useState(2);
  const [maxTeamSize, setMaxTeamSize] = useState(3);
  const [infMaxTeamSize, setInfMaxTeamSize] = useState(false);
  const toggleInfMaxTeamSize = () => {
    setInfMaxTeamSize((prev) => !prev);
  };

  const results = [
    [null, useQuery(MATCH_TYPES)],
    [null, useQuery(GET_THREAD, {variables: {id: router.query.thread}})],
    useLazyQuery(GET_MATCH_TYPE_BY_NAME),
    useMutation(CREATE_MATCH_REQUEST),
  ];
  const [matchTypes, getThread, getMatchTypeByName, createMatchRequest] = results.map(result => result[0]);
  const allMatchTypes = results[0][1].data?.matchTypes;
  const thread = results[1][1].data?.getThread;
  const articles = results[1][1].data?.getThread.getArticles;
  const matchType = results[2][1].data?.getMatchTypeByName;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  const allMatchTypesRev = {};
  allMatchTypes.forEach(function(matchType){
    allMatchTypesRev[matchType.name] = Number(matchType.id);
  });
  console.log(allMatchTypesRev);


  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

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
          <SectionBox titleBar={(<SectionTitleBar title="Expire date" icon=<EventAvailableIcon /> />)}>
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

          <SectionBox titleBar={(<SectionTitleBar title="Minimal team size" icon=<PeopleIcon /> />)}>
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

          <SectionBox titleBar={(<SectionTitleBar title="Maximal team size" icon=<PeopleIcon /> />)}>
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
                    await createMatchRequest({ variables: { request: { event: thread.event.id, type: allMatchTypesRev["RANDOM"], minTeamSize, maxTeamSize: setInfMaxTeamSize ? null : maxTeamSize, days, hours, minutes }}});
                    router.push(`/match/request/success`);
                  }}
                >
                  <Box align="center">
                    <Button variant="outlined" type="submit">Random match</Button>
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
                    await createMatchRequest({ variables: { request: { event: thread.event.id, type: allMatchTypesRev["HONOR"], minTeamSize, maxTeamSize: setInfMaxTeamSize ? null : maxTeamSize, days, hours, minutes }}});
                    router.push(`/match/request/success`);
                  }}
                >
                  <Box align="center">
                    <Button variant="outlined" type="submit">Honor match</Button>
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
                    await createMatchRequest({ variables: { request: { event: thread.event.id, type: allMatchTypesRev["PERSONALITY"], minTeamSize, maxTeamSize: setInfMaxTeamSize ? null : maxTeamSize, days, hours, minutes }}});
                    router.push(`/match/request/success`);
                  }}
                >
                  <Box align="center">
                    <Button variant="outlined" type="submit">Personality match</Button>
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

export default withAuth(Match);
