import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import ViewListIcon from '@material-ui/icons/ViewList';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';


export const CREATE_TASK = gql`
  mutation createTask($task: TaskInput!) {
    createTask (task: $task) {
      id
    }
  }
`;

function CreateTask() {
  const router = useRouter();
  const newName = useRef(null);
  const [newProgress, setNewProgress] = React.useState('TODO');

  const [
    createTask,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_TASK);

  function handleNewNameChange() {
    newName.current.focus();
  }

  const handleNewProgressChange = (event) => {
    setNewProgress(event.target.value);
  }

  return (
    <Layout>

      <PageTitleBar title="Create new task" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add task" icon=<ViewListIcon /> />}>
          <Grid container spacing={2} alignItems="center" direction="row" justify="space-between">
            <Grid item>
              <FormControl variant="outlined">
                <InputLabel>Progress</InputLabel>
                <Select
                  value={newProgress}
                  defaultValue="TODO"
                  onChange={handleNewProgressChange}
                  label="Progress"
                >
                  <MenuItem value="TODO">To do</MenuItem>
                  <MenuItem value="DOING">Doing</MenuItem>
                  <MenuItem value="DONE">Done</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newName}
                  label="Enter task name"
                  variant="outlined"
                  onClick={handleNewNameChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const taskRes = await createTask({ variables: {task: {work: router.query.work, name: newName.current.value}}});
                  const taskId = taskRes.data.createTask.id;
                  router.push(`/tasks/${taskId}`);
                }}
              >
                <Box align="center">
                  <Button variant="outlined" type="submit">Submit</Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </SectionBox>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
      </Container>

    </Layout>
  );
}

export default withAuth(CreateTask);