import React from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
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

import withAuth from '../../../components/withAuth';
import GraphQlError from '../../../components/GraphQlError';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import ProjectInfoBox from '../../../components/ProjectInfoBox';
import SectionBox from '../../../components/SectionBox';
import SectionTitleBar from '../../../components/SectionTitleBar';
import UserInfoCard from '../../../components/UserInfoCard';
import WorkInfoCard from '../../../components/WorkInfoCard';
import YesNoDialog from '../../../components/YesNoDialog';


const TEST_USER_LIST = [
  {
    id: 0,
    name: "Test User 1",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test User 2",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test User 3",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test User 4",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]



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
    [null, useQuery(GET_PROJECT, {variables: {id: router.query.project}})],
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

  TEST_USER_LIST.forEach(function(user){
    user.onClick = () => router.push({pathname: "/projects/review/user", query: { project: router.query.project, user: user.id }});
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Layout>
      <PageTitleBar title="Teammates review" backButton backButtonLink={`/teams/${project.team.id}`} />

      <SectionBox border={false}>
        <ProjectInfoBox project={project} />
      </SectionBox>

      <SectionBox>
        <Box style={{margin: "1.5rem"}}>
          <Typography variant="h5">Select a teammate to review...</Typography>
        </Box>
        {
          TEST_USER_LIST && (TEST_USER_LIST.length)
          ? (
            <Grid container>
            {
              [TEST_USER_LIST].flat().map((user) => <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardActionArea onClick={() => user.onClick ? user.onClick() : null}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center" direction="row" justify="flex-start">
                        <Grid item justify="flex-start">
                          <Avatar
                            alt={user.name}
                            src={user.image ? user.image.address : null}
                            variant="circle"
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </Grid>
                        <Grid item xs justify="flex-start">
                          <Typography variant="h6">
                            {user.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>)
            }

            </Grid>
          )
          : <NoContentsBox />
        }
      </SectionBox>

      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const projectRes = await createProject({ variables: { team: router.query.team, project: { name: newName.current.value }}});
              const projectId = projectRes.data.createProject.id;
              router.push("/projects/review/thank-you");
            }}
          >
            <Box align="center">
              <Button type="submit" variant="outlined">Submit</Button>
            </Box>
          </form>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default withAuth(ProjectInfo);