import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
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


const PROGRESSES = gql`
  query Progresses {
    progresses {
      id
      name
    }
  }
`;


const GET_WORK = gql`
  query GetWork($id: ID!) {
    getWork(id: $id) {
      id
      project {
        id
      }
      name
      opened
      order
      tasks {
        id
        name
        difficulty
        order
        progress {
          id
          name
        }
        honors {
          honor
          position {
            id
            name
            description
            image {
              id
              address
            }
          }
        }
        users {
          id
          name
          image {
            id
            address
          }
        }
      }
    }
  }
`;


function WorkInfo() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const results = [
    [null, useQuery(PROGRESSES)],
    [null, useQuery(GET_WORK, {variables: {id: router.query.id}})],
  ];
  const allProgresses = results[0][1].data ? results[0][1].data.progresses : [];
  const work = results[1][1].data ? results[1][1].data.getWork : null;
  const tasks = results[1][1].data ? results[1][1].data.getWork.tasks : null;
  const tasksTodo = [];
  const tasksDoing = [];
  const tasksDone = [];

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

    console.log(tasks);
  tasks.forEach(function(task){
    if(task.progress.name === "TODO") {
      tasksTodo.push(task);
    } else if(task.progress.name === "DOING") {
      tasksDoing.push(task);
    } else if(task.progress.name === "DONE") {
      tasksDone.push(task);
    }
  });

  tasks.forEach(function(task){
    task.onClick = () => router.push(`/tasks/${task.id}`);
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
              onClickYes={async (e) => {
                e.preventDefault();
                await deleteProject({ variables: { id: router.query.id }});
                router.push(`/works/${work.project.id}`);
              }}
            >
              <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
              <Typography variant="inherit" noWrap>Delete</Typography>
            </YesNoDialog>
          </MenuItem>
        </Menu>
      </PageTitleBar>
      <SectionBox border={false}>
        <WorkInfoBox work={work} />
      </SectionBox>
      <SectionBox>
        <BaseTabs tabProps={TAB_PROPS}>
          {
            tasksTodo && (tasksTodo.length)
            ? <Grid container>{[tasksTodo].flat().map((task) => <Grid item xs={12} sm={6} md={4}><TaskInfoCard task={task} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
          {
            tasksDoing && (tasksDoing.length)
            ? <Grid container>{[tasksDoing].flat().map((task) => <Grid item xs={12} sm={6} md={4}><TaskInfoCard task={task} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
          {
            tasksDone && (tasksDone.length)
            ? <Grid container>{[tasksDone].flat().map((task) => <Grid item xs={12} sm={6} md={4}><TaskInfoCard task={task} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </BaseTabs>
      </SectionBox>
    </Layout>
  );
}

export default withAuth(WorkInfo);