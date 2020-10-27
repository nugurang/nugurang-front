import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

import Layout from '../../components/Layout';
import BaseButton from '../../components/BaseButton';
import ImageUploadingBox from '../../components/ImageUploadingBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27';

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

export const CHECK_OAUTH2_USER = gql`
  query {
    currentOAuth2User {
      id
      name
      email
    }
  }
`;

export const CREATE_IMAGE = gql`
  mutation createImage($address: String! ) {
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

function SignUp() {
  const router = useRouter();
  const classes = useStyles();
  const newName = useRef(null);
  const newEmail = useRef(null);
  const newImageAddress = useRef(null);

  const { loading: queryLoading, error: queryError, data: userData } = useQuery(CHECK_OAUTH2_USER);
  const [
    createImage,
    { loading: imageMutationLoading, error: imageMutationError, data: imageData },
  ] = useMutation(CREATE_IMAGE);
  const [
    createUser,
    { loading: userMutationLoading, error: userMutationError },
  ] = useMutation(CREATE_USER);

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  function handleNewNameChange() {
    newName.current.focus();
  }

  function handleNewEmailChange() {
    newEmail.current.focus();
  }

  function handleNewImageAddressChange() {
    newImageAddress.current.focus();
  }

  return (
    <Layout>

      <SectionTitleBar title="Sign up" backButton/>

      <SectionBox titleBar={<SectionTitleBar title="Add username" icon=<PersonIcon /> />}>
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  className={classes.textField}
                  defaultValue={userData.currentOAuth2User.name}
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newName}
                  label="Enter username"
                  variant="outlined"
                  onClick={handleNewNameChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </SectionBox>

      <SectionBox titleBar={<SectionTitleBar title="Add email" icon=<EmailIcon /> />}>
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  className={classes.textField}
                  defaultValue={userData.currentOAuth2User.email}
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newEmail}
                  label="Enter email"
                  variant="outlined"
                  onClick={handleNewEmailChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </SectionBox>


      <SectionBox titleBar={<SectionTitleBar title="Add user image link" icon=<ImageIcon /> />}>
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  className={classes.textField}
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newImageAddress}
                  label="Enter image link"
                  variant="outlined"
                  onClick={handleNewImageAddressChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </SectionBox>

      <form
        onSubmit={e => {
          e.preventDefault();
          const WithImageAsync = async() => {
            const res = await createImage({ variables: {address: newImageAddress.current.value }});
            {imageMutationLoading && <p>Loading...</p>}
            {imageMutationError && <p>Error :( Please try again</p>}
            createUser({ variables: {name: newName.current.value, email: newEmail.current.value, biography: "", image: res.data.createImage.id }});
            router.push('/signup/welcome');
          }
          const WithoutImageAsync = () => {
            createUser({ variables: {name: newName.current.value, email: newEmail.current.value, biography: "" }});
            router.push('/signup/welcome');
          }

          {
            newImageAddress.current.value
            ? WithImageAsync()
            : WithoutImageAsync()
          };

        }}
      >
        <Box className={classes.box} align="center">
          <BaseButton
            label="Submit"
            type="submit"
          />
        </Box>
      </form>

      {userMutationLoading && <p>Loading...</p>}
      {userMutationError && <p>Error :( Please try again</p>}

    </Layout>
  );
}

export default SignUp;