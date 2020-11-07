import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import Layout from '../../components/Layout';
import BaseButton from '../../components/BaseButton';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';


const useStyles = makeStyles(() => ({
  box: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0rem',
    padding: '1rem',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '0.5rem',
    padding: '0.5rem 3rem',
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
    fontSize: 28,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export const CREATE_TASK = gql`
  mutation createTask($work: ID!, $name: String!) {
    createTask (work: $work, name: $name) {
      id
    }
  }
`;

function CreateTask() {
  const router = useRouter();
  const classes = useStyles();
  const newName = useRef(null);

  const [
    createTask,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_TEAM);

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>

      <SectionTitleBar title="Create new task" backButton />

      <SectionBox titleBar={<SectionTitleBar title="Add task name" icon=<GroupAddIcon /> />}>
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  className={classes.textField}
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newName}
                  label="Enter task name"
                  variant="outlined"
                  onClick={handleNewNameChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </SectionBox>


      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const taskRes = await createTask({ variables: {work: router.query.work, name: newName.current.value}});
          let taskId = taskRes.data.createTask.id;
          router.push(`/tasks/${taskId}`);
        }}
      >

      <form
        onSubmit={e => {
          e.preventDefault();
          createTask({ variables: {work: router.query.work, name: newName.current.value}});
          router.push('/teams');
        }}
      >
        <Box className={classes.box} align="center">
          <BaseButton
            label="Submit"
            type="submit"
          />
        </Box>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}

    </Layout>
  );
}

export default withAuth(CreateTeam);