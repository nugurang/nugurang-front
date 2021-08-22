import React from 'react';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import Button from'@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import withAuthServerSide from '../../../utils/withAuthServerSide';
import { queryToBackend } from "../../../utils/requestToBackend";
import { GetUserQueryBuilder } from '../../../queries/user';

import Layout from '../../../components/Layout';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadListItem from '../../../components/ThreadListItem';

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const userResult = await queryToBackend({
    context,
    query: new GetUserQueryBuilder().withBlog().build(),
    variables: {
      id: context.query.id,
    },
  });

  return {
    props: {
      user: userResult.data.getUser,
      blogThreads: userResult.data.getUser.blog.getThreads,
    },
  };
});

function Blog({ user, blogThreads }) {
 const router = useRouter();

  blogThreads = blogThreads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });

  return (
    <Layout>
      <PageTitleBar title="Blog" backButton>
        <Button variant="" onClick={() => router.push({pathname: "/threads/create", query: { board: user.blog.id }})}>
          <AddIcon />
        </Button>
      </PageTitleBar>
      <SectionBox>
        {
          blogThreads && blogThreads.length
          ? <List>{[blogThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
          : <NoContentsBox />
        }
      </SectionBox>
    </Layout>
  );
}

export default Blog;
