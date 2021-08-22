import React from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import withAuthServerSide from '../../utils/withAuthServerSide';
import {
  mutateToBackend,
  queryToBackend
} from "../../utils/requestToBackend";
import {
  GetProjectQueryBuilder,
  UpdateProjectFinishMutationBuilder,
  DeleteProjectMutationBuilder,
} from '../../queries/project';

import BaseTabs from '../../components/BaseTabs';
import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import ProjectInfoBox from '../../components/ProjectInfoBox';
import SectionBox from '../../components/SectionBox';
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

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const projectResult = await queryToBackend({
    context,
    query: new GetProjectQueryBuilder().withTeam().withWorks().withUsers().withEvent().build(),
    variables: {
      id: context.query.id,
    },
  });

  return {
    props: {
      project: projectResult.data.getProject,
      works: projectResult.data.getProject.works,
      users: projectResult.data.getProject.getUsers,
    },
  };
});

function ProjectInfo({ project, works, users }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  works = works.map(work => {
    return {
      ...work,
      onClick: () => router.push(`/works/${work.id}`),
    };
  });
  users = users.map(user => {
    return {
      ...user,
      onClick: () => router.push(`/user/${user.id}`),
    };
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if(project.finished) {
    router.push({
      pathname: "/projects/review",
      query: {
        project: project.id
      }
    });
    return null;
  }
  else return (
    <Layout>
      <PageTitleBar title="Project info" backButton backButtonLink={`/teams/${project.team.id}`}>
        <Button variant="" onClick={() => router.push({
          pathname: "/works/create",
          query: {
            project: router.query.id
          }
        })}>
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
                await mutateToBackend({
                  mutation: new UpdateProjectFinishMutationBuilder().build(),
                  variables: {
                    id: project.id
                  }
                });
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
                await mutateToBackend({
                  mutation: new DeleteProjectMutationBuilder().build(),
                  variables: {
                    id: project.id
                  }
                });
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
              works && works.length
              ? <Grid container>{[works].flat().map((work) => <Grid item xs={12} sm={6}><WorkInfoCard work={work} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
            {
              users && users.length
              ? <Grid container>{[users].flat().map((user) => <Grid item xs={12} sm={6}><UserInfoCard user={user} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </BaseTabs>
        </SectionBox>
      </Container>

    </Layout>
  );
}

export default ProjectInfo;
