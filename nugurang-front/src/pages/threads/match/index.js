import dayjs from "dayjs";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DayjsUtils from "@date-io/dayjs";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Slider from '@material-ui/core/Slider';

import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PeopleIcon from '@material-ui/icons/People';

import withAuth from '../../../components/withAuth';
import ArticleLeader from '../../../components/ArticleLeader';
import ArticleListItem from '../../../components/ArticleListItem';
import EventInfoBox from '../../../components/EventInfoBox';
import GraphQlError from '../../../components/GraphQlError';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';
import YesNoDialog from '../../../components/YesNoDialog';


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
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [teamSize, setTeamSize] = React.useState([2, 6]);

  const results = [
    [null, useQuery(GET_THREAD, {variables: {id: router.query.id}})],
    useLazyQuery(GET_MATCH_TYPE_BY_NAME),
    useMutation(CREATE_MATCH_REQUEST),
  ];
  const [getThread, getMatchTypeByName, createMatchRequest] = results.map(result => result[0]);
  const thread = results[0][1].data?.getThread;
  const articles = results[0][1].data?.getThread.getArticles;
  const matchType = results[1][1].data?.getMatchTypeByName;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />



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
          <SectionBox titleBar={(<SectionTitleBar title="End date" icon=<EventAvailableIcon /> />)}>
            <Box display="flex" justifyContent="center">
              <MuiPickersUtilsProvider utils={DayjsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Select end date"
                  format="YYYY-MM-DD"
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                  }}
                />
              </MuiPickersUtilsProvider>
            </Box>
          </SectionBox>
          <SectionBox titleBar={(<SectionTitleBar title="Match team size" icon=<PeopleIcon /> />)}>
            <Box style={{margin: "4rem 2rem 2rem 2rem"}}>
              <Slider
                value={teamSize}
                min={2}
                max={10}
                step={1}
                onChange={(event, newValue) => {
                  setTeamSize(newValue);
                }}
                valueLabelDisplay="on"
              />
            </Box>
          </SectionBox>
          <SectionBox border={false} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await getMatchTypeByName({ variables: { name: "RANDOM"}});
                    console.log(matchType);
                    await createMatchRequest({ variables: { request: { event: thread.event.id, type: matchType.id, minTeamSize: teamSize[0], maxTeamSize: teamSize[1], days: dayjs().diff(selectedDate, "day") }}});
                    router.push(`/threads/match/success`);
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
                    await getMatchTypeByName({ variables: { name: "HONOR"}});
                    await createMatchRequest({ variables: { request: { event: thread.event.id, type: matchType.id, minTeamSize: teamSize[0], maxTeamSize: teamSize[1], days: dayjs().diff(selectedDate, "day") }}});
                    router.push(`/threads/match/success`);
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
                    await getMatchTypeByName({ variables: { name: "PERSONALITY"}});
                    await createMatchRequest({ variables: { request: { event: thread.event.id, type: matchType.id, minTeamSize: teamSize[0], maxTeamSize: teamSize[1], days: dayjs().diff(selectedDate, "day") }}});
                    router.push(`/threads/match/success`);
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
