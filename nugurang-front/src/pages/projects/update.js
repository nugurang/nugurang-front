import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../../components/Loading';
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


const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, project: ProjectInput!) {
    updateProject(id: $id, project: $project) {
      id
    }
  }
`;

function ProjectInfo() {
  const router = useRouter();
  const newTitle = useRef(null);
  const newContent = useRef(null);

  const results = [
    [null, useQuery(GET_PROJECT, {variables: {id: router.query.id}})],
    useMutation(UPDATE_PROJECT)
  ];
  const [getProject, updateProject] = results.map(result => result[0]);
  const project = results[0][1].data ? results[0][1].data.getThread : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  project.works.forEach(function(work){
    work.onClick = () => router.push(`/works/${work.id}`);
  });
  project.getUsers.forEach(function(user){
    user.onClick = () => router.push(`/user/${user.id}`);
  });

  return (
    <Layout>
      <PageTitleBar title="Edit project" backButton="true" backButtonLink={`/teams/${project.team.id}`}>
        <Button variant="outlined" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.id }})}>Create work</Button>
      </PageTitleBar>


      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Edit title" icon=<TitleIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={project.title}
                  inputRef={newTitle}
                  label="Enter title"
                  variant="outlined"
                  onClick={handleNewTitleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Edit content" icon=<NotesIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={project.content}
                  inputRef={newContent}
                  label="Enter content"
                  variant="outlined"
                  onClick={handleNewContentChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateProject({ variables: { id: router.query.id, project: { title: newTitle.current.value, content: newContent.current.value }}});
            router.push(`/projects/${res.data.updateProject.id}`);
          }}
        >
          <Box align="center">
            <Button variant="outlined" type="submit">Submit</Button>
          </Box>
        </form>

      </Container>
    </Layout>
  );
}

export default withAuth(ProjectInfo);