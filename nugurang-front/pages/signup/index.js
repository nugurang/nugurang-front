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

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $biography: String) {
    createUser (name: $name, email: $email, biography: $biography) {
      id
    }
  }
`;

function SignUp() {
  const router = useRouter();
  const classes = useStyles();
  const newName = useRef(null);
  const newEmail = useRef(null);

  const { loading: queryLoading, error: queryError, data } = useQuery(CHECK_OAUTH2_USER);
  const [
    createUser,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_USER);

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  function handleNewNameChange() {
    newName.current.focus();
  }

  function handleNewEmailChange() {
    newEmail.current.focus();
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
                  defaultValue={data.currentOAuth2User.name}
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
                  defaultValue={data.currentOAuth2User.email}
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

      <SectionBox titleBar={<SectionTitleBar title="Add user image" icon=<ImageIcon /> />}>
        <ImageUploadingBox
          image={DEFAULT_IMAGE}
        />
      </SectionBox>

      <form
        onSubmit={e => {
          e.preventDefault();
          createUser({ variables: {name: newName.current.value, email: newEmail.current.value, biography: "" }});
          router.push('/signup/welcome');
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

export default SignUp;