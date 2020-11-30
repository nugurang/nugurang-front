import React from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
import YesNoDialog from '../../components/YesNoDialog';


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
  query GetProject($id: ID!) {
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
      finished
    }
  }
`;

const UPDATE_PROJECT_FINISH = gql`
  mutation UpdateProjectFinish($id: ID!) {
    updateProjectFinish(id: $id)
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;


function ProjectInfo() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);


  const results = [
    [null, useQuery(GET_PROJECT, {variables: {id: router.query.id}})],
    useMutation(UPDATE_PROJECT_FINISH),
    useMutation(DELETE_PROJECT)
  ];
  const [getProject, updateProjectFinish, deleteProject] = results.map(result => result[0]);
  const project = results[0][1].data ? results[0][1].data.getProject : null;

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


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if(project.finished) {
    router.push({pathname: "/projects/review", query: { project: router.query.id }});
    return null;
  }
  else return (
    <Layout>
      <PageTitleBar title="Project info" backButton backButtonLink={`/teams/${project.team.id}`}>
        <Button variant="" onClick={() => router.push({pathname: "/works/create", query: { project: router.query.id }})}>
          <AddIcon />
          Work
        </Button>
        <Button variant="" onClick={handleClick}>
          <MoreVertIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => router.push({pathname: "/projects/update", query: { project: router.query.id }})}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <Typography variant="inherit" noWrap>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <YesNoDialog
              title="Finish"
              content="Are you sure to finish?"
              onClickYes={async (e) => {
                await updateProjectFinish({ variables: { id: router.query.id }});
                router.push({pathname: "/projects/review", query: { project: router.query.id }});
              }}
            >
              <ListItemIcon><DoneIcon fontSize="small" /></ListItemIcon>
              <Typography variant="inherit" noWrap>Finish</Typography>
            </YesNoDialog>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <YesNoDialog
              title="Delete"
              content="Are you sure to delete?"
              onClickYes={async (e) => {
                e.preventDefault();
                await deleteProject({ variables: { id: router.query.id }});
                router.push(`/teams/${project.team.id}`);
              }}
            >
              <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
              <Typography variant="inherit" noWrap>Delete</Typography>
            </YesNoDialog>
          </MenuItem>
        </Menu>
      </PageTitleBar>
      <Container maxWidth="md">
        <SectionBox border={false}>
          <ProjectInfoBox project={project} />
        </SectionBox>

        <SectionBox>
          <BaseTabs tabProps={TAB_PROPS}>
            {
              project.works && (project.works.length)
              ? <Grid container>{[project.works].flat().map((work) => <Grid item xs={12} sm={6}><WorkInfoCard work={work} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
            {
              project.getUsers && (project.getUsers.length)
              ? <Grid container>{[project.getUsers].flat().map((user) => <Grid item xs={12} sm={6}><UserInfoCard user={user} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </BaseTabs>
        </SectionBox>
      </Container>

    </Layout>
  );
}

export default withAuth(ProjectInfo);