import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AddIcon from '@material-ui/icons/Add';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import ProjectInfoBox from '../../components/ProjectInfoBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoCard from '../../components/UserInfoCard';
import WorkInfoCard from '../../components/WorkInfoCard';


const TAB_PROPS = [
  {
    id: 0,
    label: "Works",
  },
  {
    id: 1,
    label: "Teammates",
  },
]


const GET_PROJECT = gql`
  query getProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      team {
        id
      }
      works {
        id
        name
      }
      event {
        id
      }
      getUsers(page: 0, pageSize: 100) {
        id
        name
        email
      }
    }
  }
`;

function ProjectInfo() {
  const router = useRouter();
  const responses = [
    useQuery(GET_PROJECT, {variables: {id: router.query.id}}),
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />
  if (responses.some((response) => response.loading))
    return <Loading />;
  
  const project = responses[0].data ? responses[0].data.getProject : null;
  const works = responses[0].data ? responses[0].data.getProject.works : [];
  const users = responses[0].data ? responses[0].data.getProject.getUsers : [];

  works.forEach(function(work){
    work.onClick = () => router.push(`/works/${work.id}`);
  });
  users.forEach(function(user){
    user.onClick = () => router.push(`/user/${user.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Project info" backButton backButtonLink={`/teams/${project.team.id}`}>
        <Button variant="" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.id }})}>
          <AddIcon />
          Work
        </Button>
      </PageTitleBar>

      <SectionBox border={false}>
        <ProjectInfoBox project={project} />
      </SectionBox>

      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          {
            works && (works.length)
            ? <Grid container>{[works].flat().map((work) => <Grid item xs={12} sm={6} md={4}><WorkInfoCard work={work} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
          {
            users && (users.length)
            ? <Grid container>{[users].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </BaseTabs>
      </SectionBox>

    </Layout>
  );
}

export default withAuth(ProjectInfo);