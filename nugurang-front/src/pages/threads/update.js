import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import ImageIcon from '@material-ui/icons/Image';
import NotesIcon from '@material-ui/icons/Notes';
import TitleIcon from '@material-ui/icons/Title';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import withAuth from '../../components/withAuth';


export const GET_THREAD = gql`
  query getThread($id: ID!) {
    getThread (id: $id) {
      id
      name
      firstArticle {
        id
        title
        content
        images {
          id
          address
        }
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

export const UPDATE_THREAD = gql`
  mutation updateThread($id: ID!, $thread: ThreadInput!) {
    updateThread (id: $id, thread: $thread) {
      id
    }
  }
`;


function Update() {
  const router = useRouter();
  const newTitle = useRef(null);
  const newContent = useRef(null);
  const newImageAddress = useRef(null);

  const results = [
    [null, useQuery(GET_THREAD, {variables: {id: router.query.thread}})],
    useMutation(CREATE_IMAGE),
    useMutation(UPDATE_THREAD)
  ];
  const [getThread, createImage, updateThread] = results.map(result => result[0]);
  const thread = results[0][1].data ? results[0][1].data.getThread : null;
  const firstArticle = results[0][1].data ? results[0][1].data.getThread.firstArticle : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleNewTitleChange() {
    newTitle.current.focus();
  }

  function handleNewContentChange() {
    newContent.current.focus();
  }

  function handleNewImageAddressChange() {
    newImageAddress.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Edit thread" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Edit title" icon=<TitleIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={firstArticle.title}
                  inputRef={newTitle}
                  label="Enter title"
                  variant="outlined"
                  onClick={handleNewTitleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Edit content" icon=<NotesIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={firstArticle.content}
                  inputRef={newContent}
                  label="Enter content"
                  variant="outlined"
                  onClick={handleNewContentChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>


        <SectionBox titleBar={<SectionTitleBar title="Edit image link" icon=<ImageIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={firstArticle.image ? firstArticle.image.address : null}
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
              const imageRes = await createImage({ variables: { address: newImageAddress.current.value }});
              image = imageRes.data.createImage.id;
            }
            console.log(newTitle.current.value);
            const threadRes = await updateThread({ variables: { id: thread.id, thread: {firstAarticle: {content: newContent.current.value, images: []}}}});
            router.push(`/threads/${threadRes.data.createThread.id}`);
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

export default withAuth(Update);