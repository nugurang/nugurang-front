import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import AssignmentIcon from '@material-ui/icons/Assignment';

import withAuth from '../../../components/withAuth';
import Loading from '../../../components/Loading';
import GraphQlError from '../../../components/GraphQlError';
import Layout from '../../../components/Layout';
import SectionTitleBar from '../../../components/SectionTitleBar';
import SectionBox from '../../../components/SectionBox';
import ThreadGrid from '../../../components/ThreadGrid';


export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      image {
        id
        address
      }
      getThreads(page: 0, pageSize: 5) {
        id
        name
        upCount
        commentCount
        user {
          name
          image {
            address
          }
        }
        firstArticle {
          images {
            address
          }
        }
      }
    }
  }
`;


function UserThreads() {
  const router = useRouter();
  const results = [
    [null, useQuery(GET_USER, {variables: {id: router.query.id}})],
  ];
  const user = results[0][1].data ? results[0][1].data.getUser : null;
  const threads = results[0][1].data ? results[0][1].data.getUser.getThreads : null;
  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  return (
    <Layout>
      <SectionTitleBar title="Threads" backButton />

      <SectionBox
        titleBar={
          <SectionTitleBar title={user.name} icon={<AssignmentIcon />} />
        }
      >
        <ThreadGrid items={threads} xs={12} sm={6} md={4} />
      </SectionBox>

    </Layout>
  );
}

export default withAuth(UserThreads);