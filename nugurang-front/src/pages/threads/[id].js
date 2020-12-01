import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import withAuth from '../../components/withAuth';
import ArticleLeader from '../../components/ArticleLeader';
import ArticleListItem from '../../components/ArticleListItem';
import ArticleStatCounterBox from '../../components/ArticleStatCounterBox';
import EventInfoBox from '../../components/EventInfoBox';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import PageTitleBar from '../../components/PageTitleBar';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import YesNoDialog from '../../components/YesNoDialog';


const VOTE_TYPES = gql`
  query {
    voteTypes {
      id
      name
    }
  }
`;

const CURRENT_USER = gql`
  query {
    currentUser {
      id
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
        content
        viewCount
        createdAt
        modifiedAt
        title
        user {
          id
          name
          image {
            id
            address
          }
        }
        images {
          id
          address
        }
        upCount
        downCount
        starCount
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
      }
    }
  }
`;


const GET_VOTE_TYPE_BY_NAME = gql`
  query GetVoteTypeByName($name: String!){
    getVoteTypeByName(name: $name) {
      id
    }
  }
`;


const CREATE_VOTE = gql`
  mutation CreateVote($vote: VoteInput!) {
    createVote(vote: $vote) {
      id
    }
  }
`;

function Thread() {
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const results = [
    [null, useQuery(VOTE_TYPES)],
    [null, useQuery(CURRENT_USER)],
    [null, useQuery(GET_THREAD, {variables: {id: router.query.id}})],
    useLazyQuery(GET_VOTE_TYPE_BY_NAME),
    useMutation(CREATE_VOTE),
  ];
  const [voteTypes, currentUser, getThread, getVoteTypeByName, createVote] = results.map(result => result[0]);
  const allVoteTypes = results[0][1].data?.voteTypes;
  const votingUser = results[1][1].data?.currentUser;
  const thread = results[2][1].data?.getThread;
  const voteType = results[3][1].data?.getVoteTypeByName;
  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  const allVoteTypesRev = {};
  allVoteTypes.forEach(function(voteType){
    allVoteTypesRev[voteType.name] = Number(voteType.id);
  });
  console.log(allVoteTypesRev);


  return (
    <Layout>
      <PageTitleBar title="Thread" backButton backButtonLink="/boards">
        <Button variant="" onClick={() => router.push({pathname: "/threads/update", query: { thread: router.query.id }})}>
          <EditIcon />
        </Button>
        <YesNoDialog
          title="Delete"
          content="Are you sure to delete?"
          onClickYes={() =>
            router.push({pathname: "/threads/update", query: { thread: router.query.id }})}
        >
          <Button variant="">
            <DeleteIcon />
          </Button>
        </YesNoDialog>
      </PageTitleBar>

      <Grid container>
        <Grid item xs={12} md={6}>
          <SectionBox>
            {
              thread.event
              ? (
                <>
                  <EventInfoBox event={thread.event} />
                  <Box style={{margin: "0.5rem"}} display="flex" justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => router.push({pathname: "/match/request", query: { thread: router.query.id }})}>Match</Button>
                  </Box>
                </>
              )
              : <ArticleLeader article={thread.firstArticle} />
            }
            <ArticleStatCounterBox
              article={thread.firstArticle}
              onClickUp = { async (e) => {
                e.preventDefault();
                await createVote({ variables: { vote: { user: votingUser.id, article: thread.firstArticle.id, voteType: allVoteTypesRev["UP"]}}});
              }}
              onClickDown = { async (e) => {
                e.preventDefault();
                await createVote({ variables: { vote: { user: votingUser.id, article: thread.firstArticle.id, voteType: allVoteTypesRev["DOWN"]}}});
              }}
              onClickStar = { async (e) => {
                e.preventDefault();
                await createVote({ variables: { vote: { user: votingUser.id, article: thread.firstArticle.id, voteType: allVoteTypesRev["STAR"]}}});
              }}
            />
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Comments" icon=<CommentIcon />>
                <Button variant="outlined" onClick={() => router.push({pathname: "/articles/create", query: { thread: thread.id }})}>Leave comment</Button>
              </SectionTitleBar>
            )}
          >
            <List>
              {[thread.getArticles.slice(1)].flat().map((article) => <ArticleListItem article={article} />)}
            </List>
          </SectionBox>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withAuth(Thread);
