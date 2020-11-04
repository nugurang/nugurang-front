/* import { gql, useQuery } from '@apollo/client'; */
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../../components/Layout';

import BaseMultiSelect from '../../components/BaseMultiSelect';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';



const useStyles = makeStyles(() => ({
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0px',
    padding: '20px',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '5px',
    padding: '5px 30px',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));



const TEST_POSITION_LIST = [
  {
    id: 0,
    label: "Position A",
    value: "a",
  },
  {
    id: 1,
    label: "Position B",
    value: "b",
  },
  {
    id: 2,
    label: "Position C",
    value: "c",
  },
  {
    id: 3,
    label: "Position D",
    value: "d",
  },
]



const TEST_USER_LIST = [
  {
    id: 0,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]




export default function PeerReviewIndex() {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Layout>
      <SectionTitleBar title="Peer review" backButton />
      {TEST_USER_LIST.flat().map((item) => (
        <SectionBox key={item.id} titleBar={<SectionTitleBar title={item.name} avatar={item.image} circleIcon="true" />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.typography}>Did very well of...</Typography>
              <BaseMultiSelect
                items={TEST_POSITION_LIST}
                label="Position"
                placeholder="Select position"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.typography}>Needs to go the extra mile to...</Typography>
              <BaseMultiSelect
                items={TEST_POSITION_LIST}
                label="Position"
                placeholder="Select position"
              />
            </Grid>
          </Grid>
        </SectionBox>
        )
      )}
      <Box className={classes.box} align="center">
        <Button onClick={() => router.push('/peer-review/thank-you')}>Submit</Button>
      </Box>
    </Layout>
  );
}