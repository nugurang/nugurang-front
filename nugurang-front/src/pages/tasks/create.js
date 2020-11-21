import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';

const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;

const GET_WORK = gql`
  query GetWork($id: ID!) {
    getWork(id: $id) {
      id
      name
      project {
        id
        name
        getUsers(page: 0, pageSize: 5) {
          id
          name
          email
          image {
            id
            address
          }
        }
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($work: ID!, $task: TaskInput!) {
    createTask (work: $work, task: $task) {
      id
    }
  }
`;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function CreateTask() {
  const router = useRouter();
  const newName = useRef(null);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedPositions, setSelectedPositions] = useState();

  const results = [
    [null, useQuery(POSITIONS)],
    [null, useQuery(GET_WORK, {variables: {id: router.query.work}})],
    useMutation(CREATE_TASK),
  ];
  const [positions, getWork, createTask] = results.map(result => result[0]);
  const allPositions = results[0][1].data?.positions;
  const work = results[1][1].data?.getWork;
  const project = results[1][1].data?.getWork.project;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />;

  project.getUsers.forEach(function(user){
    user.onClick = (event, newValue) => {
      setSelectedUser(newValue);
    };
  });

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>

      <PageTitleBar title="Create new task" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add task name" icon=<ViewListIcon /> border={false} />}>
          <FormControl fullWidth variant="filled">
            <TextField
              inputRef={newName}
              label="Enter task name"
              variant="outlined"
              onClick={handleNewNameChange}
            />
          </FormControl>
        </SectionBox>
        <SectionBox titleBar={<SectionTitleBar title="Add assignee" icon=<PersonIcon /> border={false} />}>
          <Autocomplete
            onChange={(event, newValue) => {
              setSelectedUser(newValue);
            }}
            options={project.getUsers}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            limitTags={2}
            renderOption={(user, { selected }) => (
              <>
                <Avatar
                  alt={user.name}
                  src={user.image ? user.image.address : null}
                  variant="circle"
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1">{user.name}</Typography>
              </>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Select assignee" placeholder="Assignee" />
            )}
          />

        </SectionBox>
        <SectionBox titleBar={<SectionTitleBar title="Select positions" icon=<AssignmentIndIcon /> border={false} />}>


        <Autocomplete
          multiple
          onChange={(event, newValue) => {
            setSelectedPositions(newValue);
          }}
          options={allPositions}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          limitTags={2}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </>
          )}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Select positions" placeholder="Positions" />
          )}
        />

        </SectionBox>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const taskRes = await createTask({ variables: {work: router.query.work, task: { name: newName.current.value, users: [selectedUser.id], positions: selectedPositions.map(position => position.id) }}});
            router.push(`/works/${router.query.work}`);
          }}
        >
          <Box align="center">
            <Button variant="outlined" type="submit">Submit</Button>
          </Box>
        </form>


        {createTask.loading && <p>Loading...</p>}
        {createTask.error && <p>Error :( Please try again</p>}
      </Container>

    </Layout>
  );
}

export default withAuth(CreateTask);