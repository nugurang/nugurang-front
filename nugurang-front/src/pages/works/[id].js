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
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend, mutateToBackend } from "../../utils/requestToBackend";
import {
  GetWorkQueryBuilder,
  DeleteWorkMutationBuilder,
} from '../../queries/work';

import BaseTabs from '../../components/BaseTabs';
import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import TaskInfoCard from '../../components/TaskInfoCard';
import WorkInfoBox from '../../components/WorkInfoBox';
import YesNoDialog from '../../components/YesNoDialog';


const TAB_PROPS = [
  {
    id: 0,
    label: "To do",
  },
  {
    id: 1,
    label: "Doing",
  },
  {
    id: 2,
    label: "Done",
  },
]

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const workResult = await queryToBackend({
    context,
    query: new GetWorkQueryBuilder().withTasks().build(),
    variables: {
      id: context.query.id,
    },
  });

  if (!workResult.data.getWork) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      work: workResult.data.getWork,
      tasks: workResult.data.getWork.tasks,
    },
  };
});

function WorkInfo({ work, tasks }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const tasksTodo = [];
  const tasksDoing = [];
  const tasksDone = [];

  tasks = tasks.map(task => {
    return {
      ...task,
      onClick: () => router.push(`/tasks/${task.id}`),
    };
  });

  tasks.forEach(function(task){
    if(task.progress.name === "TODO") {
      tasksTodo.push(task);
    } else if(task.progress.name === "DOING") {
      tasksDoing.push(task);
    } else if(task.progress.name === "DONE") {
      tasksDone.push(task);
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Layout>
      <PageTitleBar title="Work info" backButton="true" backButtonLink={`/projects/${work.project.id}`}>
        <Button variant="" onClick={() => router.push({pathname: "/tasks/create", query: { work: router.query.id }})}>
          <AddIcon />
          Task
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
          <MenuItem onClick={() => router.push({pathname: "/works/update", query: { work: router.query.id }})}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <Typography variant="inherit" noWrap>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <YesNoDialog
              title="Delete"
              content="Are you sure to delete?"
              onClickYes={async () => {
                await mutateToBackend({
                  mutation: new DeleteWorkMutationBuilder().build(),
                  variables: {
                    id: router.query.id
                  }
                });
                router.push(`/projects/${work.project.id}`);
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
          <WorkInfoBox work={work} />
        </SectionBox>
        <SectionBox>
          <BaseTabs tabProps={TAB_PROPS}>
            {
              tasksTodo && (tasksTodo.length)
              ? <Grid container>{[tasksTodo].flat().map((task) => <Grid item xs={12} sm={6}><TaskInfoCard task={task} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
            {
              tasksDoing && (tasksDoing.length)
              ? <Grid container>{[tasksDoing].flat().map((task) => <Grid item xs={12} sm={6}><TaskInfoCard task={task} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
            {
              tasksDone && (tasksDone.length)
              ? <Grid container>{[tasksDone].flat().map((task) => <Grid item xs={12} sm={6}><TaskInfoCard task={task} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
          </BaseTabs>
        </SectionBox>
      </Container>
    </Layout>
  );
}

export default WorkInfo;
