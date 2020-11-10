import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import EmailIcon from '@material-ui/icons/Email';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';

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

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      name
      email
      image {
        id
        address
      }
    }
  }
`;

export const CREATE_IMAGE = gql`
  mutation createImage($address: String!) {
    createImage (address: $address) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $biography: String, $image: ID ) {
    createUser (name: $name, email: $email, biography: $biography, image: $image) {
      id
    }
  }
`;


function Update() {
  const router = useRouter();
  const newName = useRef(null);
  const newEmail = useRef(null);
  const newImageAddress = useRef(null);
  const [open, setOpen] = React.useState(false);

  const results = [
    [null, useQuery(CURRENT_USER)],
    useMutation(CREATE_IMAGE),
    useMutation(CREATE_USER)
  ];
  const [currentUser, createImage, createUser] = results.map(result => result[0]);
  const userData = results[0][1].data;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleNewNameChange() {
    newName.current.focus();
  }

  function handleNewEmailChange() {
    newEmail.current.focus();
  }

  function handleNewImageAddressChange() {
    newImageAddress.current.focus();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout>

      <PageTitleBar title="Change info" backButton />

      <BaseTabs tabProps={TAB_PROPS}>
        <div>
          <SectionBox titleBar={<SectionTitleBar title="Change username" icon=<PersonIcon /> />} border={false}>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item xs>
                <FormControl fullWidth variant="filled">
                  <TextField
                    defaultValue={userData.currentUser.name}
                    inputRef={newName}
                    label="Enter username"
                    variant="outlined"
                    onClick={handleNewNameChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </SectionBox>

          <SectionBox titleBar={<SectionTitleBar title="Change email" icon=<EmailIcon /> />} border={false}>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item xs>
                <FormControl fullWidth variant="filled">
                  <TextField
                    defaultValue={userData.currentUser.email}
                    inputRef={newEmail}
                    label="Enter email"
                    variant="outlined"
                    onClick={handleNewEmailChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </SectionBox>

          <SectionBox titleBar={<SectionTitleBar title="Change user image link" icon=<ImageIcon /> />} border={false}>
            <Grid container spacing={2} alignItems="center" justify="space-between">
              <Grid item xs>
                <FormControl fullWidth variant="filled">
                  <TextField
                    defaultValue={userData.currentUser.image ? userData.currentUser.image.address : null}
                    inputRef={newImageAddress}
                    label="Enter image link"
                    variant="outlined"
                    onClick={handleNewImageAddressChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </SectionBox>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              let image;
              if (newImageAddress.current.value) {
                const res = await createImage({ variables: { address: newImageAddress.current.value }});
                image = res.data.createImage.id;
              }
              await createUser({ variables: {name: newName.current.value, email: newEmail.current.value, biography: "", image }});
              router.push('/signup/welcome');
            }}
          >
            <Box align="center">
              <Button type="submit" disabled>Submit</Button>
            </Box>
          </form>
        </div>

        <div>
          <SectionBox titleBar={<SectionTitleBar title="Delete user" icon=<ImageIcon /> />} border={false}>
            <Typography>Warning: this action CANNOT be undone.</Typography>
          </SectionBox>
          <Box align="center">
            <Button onClick={handleClickOpen}>
              Delete account
            </Button>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Denied
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                No you cannot leave :D
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      </BaseTabs>
    </Layout>
  );
}

export default withAuth(Update);
