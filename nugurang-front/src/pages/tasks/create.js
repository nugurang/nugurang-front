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
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';

import withAuthServerSide from '../../utils/withAuthServerSide';
import {
  mutateToBackend,
  queryToBackend
} from "../../utils/requestToBackend";
import { GetWorkQueryBuilder } from '../../queries/task';
import {
  GetAllTaskPositionsQueryBuilder,
  CreateTaskMutationBuilder,
} from '../../queries/task';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import withAuth from '../../components/withAuth';

const marks = [
  {
    value: 0,
    label: 'Easy',
  },
  {
    value: 10,
    label: 'Hard',
  }
];

export const getServerSideProps = withAuthServerSide(async ({ context }) => {
  const allTaskPositionssResult = await queryToBackend({
    context,
    query: new GetAllTaskPositionsQueryBuilder().build(),
  });
  const workResult = await queryToBackend({
    context,
    query: new GetWorkQueryBuilder().withProject().build(),
    variables: {
      id: context.query.work,
    },
  });

  return {
    props: {
      allTaskPositions: allTaskPositionssResult.data.positions,
      work: workResult.data.getWork,
      project: workResult.data.getWork.project,
    },
  };
});

function CreateTask({ allTaskPositions, work, project }) {
  const router = useRouter();
  const newName = useRef(null);
  const [selectedUsers, setSelectedUsers] = useState();
  const [selectedPositions, setSelectedPositions] = useState();
  const [difficulty, setDifficulty] = useState();

  function handleNewNameChange() {
    newName.current.focus();
  }

  return (
    <Layout>

      <PageTitleBar title="Create new task" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add task name" icon={<ViewListIcon />} border={false} />}>
          <FormControl fullWidth variant="filled">
            <TextField
              inputRef={newName}
              label="Enter task name"
              variant="outlined"
              onClick={handleNewNameChange}
            />
          </FormControl>
        </SectionBox>
        <SectionBox titleBar={<SectionTitleBar title="Select assignee" icon={<PersonIcon />} border={false} />}>
          <Autocomplete
            multiple
            onChange={(event, newValue) => {
              setSelectedUsers(newValue);
            }}
            options={project.getUsers}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            limitTags={2}
            renderOption={user => (
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
        <SectionBox titleBar={<SectionTitleBar title="Select positions" icon={<AssignmentIndIcon />} border={false} />}>

        <Autocomplete
          multiple
          onChange={(event, newValue) => {
            setSelectedPositions(newValue);
          }}
          options={allTaskPositions}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          limitTags={2}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
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

        <SectionBox titleBar={<SectionTitleBar title="Select difficluty" icon={<EmojiFlagsIcon />} />}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box style={{margin: "2rem"}}>
                <Slider
                  defaultValue={5}
                  min={0}
                  max={10}
                  step={1}
                  onChange={(event, newValue) => {
                    setDifficulty(newValue);
                  }}
                  valueLabelDisplay="on"
                  marks={marks}
                />
              </Box>
            </Grid>
          </Grid>
        </SectionBox>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await mutateToBackend({
              mutation: new CreateTaskMutationBuilder().build(),
              variables: {
                work: work.id,
                task: {
                  name: newName.current.value,
                  users: selectedUsers.map(user => user.id),
                  positions: selectedPositions.map(position => position.id),
                  difficulty
                }
              }
            });
            router.push(`/works/${work.id}`);
          }}
        >
          <Box align="center">
            <Button variant="outlined" type="submit">Submit</Button>
          </Box>
        </form>
      </Container>

    </Layout>
  );
}

export default CreateTask;
