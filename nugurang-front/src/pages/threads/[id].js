import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend, mutateToBackend } from "../../utils/requestToBackend";
import {
  GetThreadQueryBuilder,
  GetAllThreadVoteTypesQueryBuilder,
  CreateThreadVoteMutationBuilder,
 } from '../../queries/thread';

import ArticleLeader from '../../components/ArticleLeader';
import ArticleListItem from '../../components/ArticleListItem';
import ArticleStatCounterBox from '../../components/ArticleStatCounterBox';
import EventInfoBox from '../../components/EventInfoBox';
import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import YesNoDialog from '../../components/YesNoDialog';

export const getServerSideProps = withAuthServerSide(async ({ context, currentUser }) => {
  const allVoteTypesResult = await queryToBackend({
    context,
    query: new GetAllThreadVoteTypesQueryBuilder().build(),
  });
  const threadResult = await queryToBackend({
    context,
    query: new GetThreadQueryBuilder().withEvent().withFirstArticle().withArticles().build(),
    variables: {
      id: context.query.id,
    },
  });

  return {
    props: {
      currentUser,
      allVoteTypes: allVoteTypesResult.data.voteTypes,
      thread: threadResult.data.getThread,
    },
  };
});

function Thread({ currentUser, allVoteTypes, thread }) {
  const router = useRouter();

  const allVoteTypesRev = {};
  allVoteTypes.forEach(function(voteType){
    allVoteTypesRev[voteType.name] = Number(voteType.id);
  });

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

                  <Box style={{margin: "0.5rem"}} display="flex" alignItems="center" justifyContent="flex-end">
                    <Typography variant="body1">
                      {thread.event.matchRequests.length}{" requests"}
                    </Typography>
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
                await mutateToBackend({
                  mutation: new CreateThreadVoteMutationBuilder().build(),
                  variables: {
                    vote: {
                      user: currentUser.id,
                      article: thread.firstArticle.id,
                      voteType: allVoteTypesRev["UP"]
                    }
                  }
                });
              }}
              onClickDown = { async (e) => {
                e.preventDefault();
                await mutateToBackend({
                  mutation: new CreateThreadVoteMutationBuilder().build(),
                  variables: {
                    vote: {
                      user: currentUser.id,
                      article: thread.firstArticle.id,
                      voteType: allVoteTypesRev["DOWN"]
                    }
                  }
                });
              }}
              onClickStar = { async (e) => {
                e.preventDefault();
                await mutateToBackend({
                  mutation: new CreateThreadVoteMutationBuilder().build(),
                  variables: {
                    vote: {
                      user: currentUser.id,
                      article: thread.firstArticle.id,
                      voteType: allVoteTypesRev["STAR"]
                    }
                  }
                });
              }}
            />
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Comments" icon={<CommentIcon />}>
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

export default Thread;
