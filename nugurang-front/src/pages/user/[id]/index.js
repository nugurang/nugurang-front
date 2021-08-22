import React from 'react';
import { useRouter } from 'next/router';
import Button from'@material-ui/core/Button';
import Grid from'@material-ui/core/Grid';
import IconButton from'@material-ui/core/IconButton';
import List from'@material-ui/core/List';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BookIcon from '@material-ui/icons/Book';
import EditIcon from '@material-ui/icons/Edit';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import withAuthServerSide from '../../../utils/withAuthServerSide';
import { mutateToBackend, queryToBackend } from "../../../utils/requestToBackend";
import { GetUserQueryBuilder, CreateUserFollowingMutationBuilder } from '../../../queries/user';

import Layout from '../../../components/Layout';
import HonorCard from '../../../components/HonorCard';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import SectionTitleBar from '../../../components/SectionTitleBar';
import UserInfoBox from '../../../components/UserInfoBox';
import ThreadListItem from '../../../components/ThreadListItem';

export const getServerSideProps = withAuthServerSide(async ({ context, currentUser }) => {
  const userResult = await queryToBackend({
    context,
    query: new GetUserQueryBuilder().withFollows().withHonors().withThreads().withBlog().build(),
    variables: {
      id: context.query.id,
    },
  });

  return {
    props: {
      currentUser,
      user: userResult.data.getUser,
      threads: userResult.data.getUser.getThreads,
      blogThreads: userResult.data.getUser.blog.getThreads,
    },
  };
});


function UserInfo({ currentUser, user, threads, blogThreads }) {
  const router = useRouter();

  threads = threads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });
  blogThreads = blogThreads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });

  return (
    <Layout>
      {
        user.id === currentUser.id
        ? (
          <PageTitleBar title="My info" backButton>
            <IconButton onClick={() => router.push(`/user/update`)}>
              <EditIcon />
            </IconButton>
          </PageTitleBar>
        )
        : <PageTitleBar title="User info" backButton />
      }

      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <SectionBox border={false}>
            <UserInfoBox user={user} />
            <Grid container direction="row" justify="flex-end">
              <Grid item align="right">
                <Button variant="outlined" onClick={() => router.push(`/user/${router.query.id}/follows`)}>
                  People
                </Button>
              </Grid>
              {
                user.id != currentUser.id
                ? (
                  <Grid item align="right">
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        mutateToBackend({
                          mutation: new CreateUserFollowingMutationBuilder().build(),
                          variables: {
                            user: router.query.id
                          }
                        });
                      }}
                    >
                      <Button variant="outlined" type="submit">
                        Follow
                      </Button>
                    </form>
                  </Grid>
                )
                : <></>
              }
            </Grid>
          </SectionBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <SectionBox
            titleBar={(
              <SectionTitleBar title="Recent threads" icon={<AssignmentIcon />}>
                <IconButton onClick={() => router.push(`/user/${router.query.id}/threads`)}>
                  <ArrowForwardIcon />
                </IconButton>
              </SectionTitleBar>
            )}
          >
            {
              threads && threads.length
              ? <List>{[threads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>

          <SectionBox
            titleBar={(
              <SectionTitleBar title="Recent blog updates" icon={<BookIcon />}>
                <IconButton onClick={() => router.push(`/user/${router.query.id}/blog`)}>
                  <ArrowForwardIcon />
                </IconButton>
              </SectionTitleBar>
            )}
          >
            {
              blogThreads && blogThreads.length
              ? <List>{[blogThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
              : <NoContentsBox />
            }
          </SectionBox>

          <SectionBox
            titleBar={(
              <SectionTitleBar title="Honor badges" icon={<EmojiEventsIcon />}>
                <IconButton onClick={() => router.push(`/user/${router.query.id}/honor`)}>
                  <ArrowForwardIcon />
                </IconButton>
              </SectionTitleBar>
            )}
          >
            {
              user.honors && user.honors.length
              ? <Grid container>{user.honors.flat().map((honor) => <Grid item xs={4} md={3}><HonorCard honor={honor} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </SectionBox>

        </Grid>
      </Grid>
    </Layout>
  );
}

export default UserInfo;
