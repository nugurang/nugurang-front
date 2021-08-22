import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetBoardQueryBuilder } from '../../queries/board';

import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadCard from '../../components/ThreadCard';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const boardResult = await queryToBackend({
    context,
    query: new GetBoardQueryBuilder().withThreads().build(),
    variables: {
      id: context.query.id,
    },
  });

  return {
    props: {
      board: boardResult.data.getBoard,
      threads: boardResult.data.getBoard.getThreads,
    },
  };
});

function Board({ board, threads }) {
  const router = useRouter();

  threads = threads.map(thread => {
    return {
      ...thread,
      onClick: () => router.push(`/threads/${thread.id}`),
    };
  });

  return (
    <Layout>
      <PageTitleBar title="Boards" backButton />

      <SectionBox
        titleBar={
          (
            <SectionTitleBar title={board.name} icon={<AssignmentIcon />}>
              <IconButton onClick={() => router.push({pathname: "/threads/create", query: { board: router.query.id }})}>
                <AddIcon />
              </IconButton>
            </SectionTitleBar>
          )
        }
      >
        {
          threads && (threads.length)
          ? <Grid container>{[threads].flat().map((thread) => <Grid item xs={12} sm={6} md={4}><ThreadCard thread={thread} /></Grid>)}</Grid>
          : <NoContentsBox />
        }
      </SectionBox>

    </Layout>
  );
}

export default Board;
