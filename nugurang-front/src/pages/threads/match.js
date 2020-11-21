import "dayjs";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
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

import withAuth from '../../components/withAuth';
import ArticleLeader from '../../components/ArticleLeader';
import ArticleListItem from '../../components/ArticleListItem';
import EventInfoBox from '../../components/EventInfoBox';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import YesNoDialog from '../../components/YesNoDialog';


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

function Match() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [headCount, setHeadCount] = React.useState([2, 6]);

  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };
  
  const responses = [
    useQuery(GET_THREAD, {variables: {id: router.query.id}})
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const thread = responses[0].data.getThread;
  const articles = responses[0].data.getThread.getArticles;

  console.log(thread.event);

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
          <SectionBox titleBar={(<SectionTitleBar title="Match headcount" icon=<PeopleIcon /> />)}>
            <Box style={{margin: "4rem 2rem 2rem 2rem"}}>
              <Slider
                value={headCount}
                min={2}
                max={10}
                step={1}
                onChange={(event, newValue) => {
                  setHeadCount(newValue);
                }}
                valueLabelDisplay="on"
              />
            </Box>
          </SectionBox>
          <Box style={{margin: "0.5rem"}} display="flex" justifyContent="flex-end">
            <Button fullWidth variant="outlined" onClick={() => router.push({pathname: "/threads/match", query: { id: router.query.id }})}>Qucik match</Button>
          </Box>
          <Box style={{margin: "0.5rem"}} display="flex" justifyContent="flex-end">
            <Button fullWidth variant="outlined" onClick={() => router.push({pathname: "/threads/match", query: { id: router.query.id }})}>Level match</Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withAuth(Match);
