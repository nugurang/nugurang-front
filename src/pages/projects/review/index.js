import React from 'react';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withAuthServerSide from '../../../utils/withAuthServerSide';
import { queryToBackend } from "../../../utils/requestToBackend";
import { GetProjectQueryBuilder } from '../../../queries/project';

import Layout from '../../../components/Layout';
import NoContentsBox from '../../../components/NoContentsBox';
import PageTitleBar from '../../../components/PageTitleBar';
import ProjectInfoBox from '../../../components/ProjectInfoBox';
import SectionBox from '../../../components/SectionBox';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const projectResult = await queryToBackend({
    context,
    query: new GetProjectQueryBuilder().withTeam().withWorks().withEvent().withUsers().build(),
    variables: {
      id: context.query.project,
    },
  });

  if (!projectResult.data.getProject) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      project: projectResult.data.getProject,
    },
  };
});

function ProjectInfo({ project }) {
  const router = useRouter();

  project.getUsers = project.getUsers.map(user => {
    return {
      ...user,
      onClick: () => router.push({
        pathname: "/projects/review/user",
        query: {
          project: router.query.project,
          user: user.id
        },
      }),
    };
  });

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
          project.getUsers && (project.getUsers.length)
          ? (
            <Grid container>
              {
              [project.getUsers].flat().map((user) => (
                <Grid item xs={12} sm={6} md={4}>
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
                            <Typography variant="body1">
                              {user.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
))
            }

            </Grid>
          )
          : <NoContentsBox />
        }
      </SectionBox>

    </Layout>
  );
}

export default ProjectInfo;
