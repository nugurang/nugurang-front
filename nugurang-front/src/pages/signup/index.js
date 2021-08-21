import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import EmailIcon from '@material-ui/icons/Email';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

import graphQlClient from "../../graphQlClient";
import {
  GetCurrentOAuth2UserQueryBuilder,
  CreateUserMutationBuilder,
} from '../../queries/user';
import {
  CreateImageMutationBuilder,
} from '../../queries/image';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';


export const getServerSideProps = async (context) => {
  const currentOAuth2UserResult = await graphQlClient.query({
    query: new GetCurrentOAuth2UserQueryBuilder().build(),
    context: {
        headers: {
            Cookie: context.req.headers.cookie
        }
    }
  });

  return {
    props: {
      currentOAuth2User: currentOAuth2UserResult.data ? currentOAuth2UserResult.data.currentOAuth2User : null,
    },
  };
};

function SignUp({ currentOAuth2User }) {
  const router = useRouter();
  const newName = useRef(null);
  const newEmail = useRef(null);
  const newImageAddress = useRef(null);

  const results = [
    useMutation(new CreateImageMutationBuilder().build()),
    useMutation(new CreateUserMutationBuilder().build()),
  ];
  const [createImage, createUser] = results.map(result => result[0]);

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

  return (
    <Layout>
      <PageTitleBar title="Sign up" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add username" icon=<PersonIcon /> />} border={false}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={currentOAuth2User.name}
                  inputRef={newName}
                  label="Enter username"
                  variant="outlined"
                  onClick={handleNewNameChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Add email" icon=<EmailIcon /> />} border={false}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={currentOAuth2User.email}
                  inputRef={newEmail}
                  label="Enter email"
                  variant="outlined"
                  onClick={handleNewEmailChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Add user image link" icon=<ImageIcon /> />} border={false}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
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
            await createUser({ variables: { user: { name: newName.current.value, email: newEmail.current.value, biography: "", image }}});
            router.push(`/signup/welcome`);
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

export default SignUp;
