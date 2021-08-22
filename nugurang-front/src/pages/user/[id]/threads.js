import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';

import withAuthServerSide from '../../../utils/withAuthServerSide';
import { queryToBackend } from "../../../utils/requestToBackend";
import { GetUserQueryBuilder } from '../../../queries/user';

import Layout from '../../../components/Layout';
import PageTitleBar from '../../../components/PageTitleBar';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadCard from '../../../components/ThreadCard';
import 'array-flat-polyfill';

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const userResult = await queryToBackend({
    context,
    query: new GetUserQueryBuilder().withThreads().build(),
    variables: {
      id: context.query.id,
    },
  });

  return {
    props: {
      user: userResult.data.getUser,
      threads: userResult.data.getUser.getThreads,
    },
  };
});

function Threads({ user, threads }) {
  const router = useRouter();
  return (
    <Layout>
      <PageTitleBar title="Threads" backButton />

      <SectionBox
        titleBar={
          <SectionTitleBar title={user.name} icon={<AssignmentIcon />} />
        }
      >
        <Grid container>
          {[threads].flat().map((thread) => <Grid item xs={12} sm={6} md={4}><ThreadCard thread={thread} /></Grid>)}
        </Grid>
      </SectionBox>

    </Layout>
  );
}

export default Threads;
