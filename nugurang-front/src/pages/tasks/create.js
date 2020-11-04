import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewList';

import Layout from '../../components/Layout';
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
  mutation createTask($task: TaskInput!) {
    createTask (task: $task) {
      id
    }
  }
`;

function CreateTask() {
  const router = useRouter();
  const classes = useStyles();
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

      <SectionTitleBar title="Create new task" backButton />


      <SectionBox titleBar={<SectionTitleBar title="Add task" icon=<ViewListIcon /> />} border={false}>
        <Grid container spacing={2} alignItems="center" direction="row" justify="space-between">
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
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
      </SectionBox>


      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const taskRes = await createTask({ variables: {task: {work: router.query.work, name: newName.current.value}}});
          let taskId = taskRes.data.createTask.id;
          router.push(`/tasks/${taskId}`);
        }}
      >
        <Box className={classes.box} align="center">
          <Button type="submit">Submit</Button>
        </Box>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}

    </Layout>
  );
}

export default withAuth(CreateTask);