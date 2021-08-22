import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

import { mutateToBackend } from "../../utils/requestToBackend";
import { UpdateUserMutationBuilder } from '../../queries/user';
import {
  CreateImageMutationBuilder,
} from '../../queries/image';
import withAuthServerSide from '../../utils/withAuthServerSide';

import BaseTabs from '../../components/BaseTabs';
import Layout from '../../components/Layout';
import OKDialog from '../../components/OKDialog';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

const TAB_PROPS = [
  {
    id: 0,
    label: "Profile",
  },
  {
    id: 1,
    label: "Security",
  },
]

export const getServerSideProps = withAuthServerSide(async ({ currentUser }) => {
  return {
    props: {
      currentUser,
    },
  };
});

function Update({ currentUser }) {
  const router = useRouter();
  const newName = useRef(null);
  const newEmail = useRef(null);
  const newImageAddress = useRef(null);
  const newBiography = useRef(null);

  function handleNewNameChange() {
    newName.current.focus();
  }

  function handleNewEmailChange() {
    newEmail.current.focus();
  }

  function handleNewImageAddressChange() {
    newImageAddress.current.focus();
  }

  function handleNewBiographyChange() {
    newBiography.current.focus();
  }

  return (
    <Layout>

      <PageTitleBar title="Update info" backButton />

      <Container maxWidth="md">
        <BaseTabs tabProps={TAB_PROPS}>
          <div>
            <SectionBox titleBar={<SectionTitleBar title="Change username" icon={<PersonIcon />} />} border={false}>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item xs>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      defaultValue={currentUser.name}
                      inputRef={newName}
                      label="Enter username"
                      variant="outlined"
                      onClick={handleNewNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </SectionBox>

            <SectionBox titleBar={<SectionTitleBar title="Change email" icon={<EmailIcon />} />} border={false}>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item xs>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      defaultValue={currentUser.email}
                      inputRef={newEmail}
                      label="Enter email"
                      variant="outlined"
                      onClick={handleNewEmailChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </SectionBox>

            <SectionBox titleBar={<SectionTitleBar title="Change user image link" icon={<ImageIcon />} />} border={false}>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item xs>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      defaultValue={currentUser.image ? currentUser.image.address : null}
                      inputRef={newImageAddress}
                      label="Enter image link"
                      variant="outlined"
                      onClick={handleNewImageAddressChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </SectionBox>

            <SectionBox titleBar={<SectionTitleBar title="Change biography" icon={<AssignmentIndIcon />} />} border={false}>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item xs>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      multiline
                      rows={5}
                      defaultValue={currentUser.biography}
                      inputRef={newBiography}
                      label="Enter biography"
                      variant="outlined"
                      onClick={handleNewBiographyChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </SectionBox>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const name = newName.current.value;
                const email = newEmail.current.value;
                const biography = newBiography.current.value;
                let image;
                if (newImageAddress.current.value) {
                  const res = await mutateToBackend({
                    mutation: new CreateImageMutationBuilder().build(),
                    variables: {
                      address: newImageAddress.current.value
                    }
                  });
                  image = Number(res.data.createImage.id);
                }
                await mutateToBackend({
                  mutation: new UpdateUserMutationBuilder().build(),
                  variables: {
                    user: {
                      name,
                      email,
                      biography,
                      image,
                    }
                  }
                });
                router.push(`/user/${user.id}`);
              }}
            >
              <Box align="center">
                <Button variant="outlined" type="submit">Submit</Button>
              </Box>
            </form>
          </div>

          <div>
            <SectionBox titleBar={<SectionTitleBar title="Delete user" icon={<DeleteIcon />} />}>
              <Box style={{margin: "1rem"}}>
                <Typography gutterBottom style={{color: "red"}}>Warning: this action CANNOT be undone.</Typography>
              </Box>
              <Box align="center">
                <OKDialog label="Delete" title="Denied" content="No you cannot leave :D">
                  <Button variant="outlined" type="submit">Delete</Button>
                </OKDialog>
              </Box>
            </SectionBox>
          </div>

        </BaseTabs>
      </Container>

    </Layout>
  );
}

export default Update;
