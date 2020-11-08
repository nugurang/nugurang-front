import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ImageIcon from '@material-ui/icons/Image';

import Layout from '../../components/Layout';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import withAuth from '../../components/withAuth';


export const CREATE_IMAGE = gql`
  mutation createImage($address: String!) {
    createImage (address: $address) {
      id
    }
  }
`;

export const CREATE_THREAD = gql`
  mutation createThread($thread: ThreadInput!) {
    createThread (thread: $thread) {
      id
    }
  }
`;


function CreateThread() {
  const router = useRouter();
  const newTitle = useRef(null);
  const newContent = useRef(null);
  const newImageAddress = useRef(null);

  const results = [
    useMutation(CREATE_IMAGE),
    useMutation(CREATE_THREAD)
  ];
  const [createImage, createThread] = results.map(result => result[0]);

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
      <SectionTitleBar title="Create new thread" backButton />

      <SectionBox titleBar={<SectionTitleBar title="Add title" icon=<GroupAddIcon /> />}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item xs>
            <FormControl fullWidth variant="filled">
              <TextField
                inputRef={newTitle}
                label="Enter title"
                variant="outlined"
                onClick={handleNewTitleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </SectionBox>

      <SectionBox titleBar={<SectionTitleBar title="Add content" icon=<GroupAddIcon /> />}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item xs>
            <FormControl fullWidth variant="filled">
              <TextField
                inputRef={newContent}
                label="Enter content"
                variant="outlined"
                onClick={handleNewContentChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </SectionBox>


      <SectionBox titleBar={<SectionTitleBar title="Add image link" icon=<ImageIcon /> />}>
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
            const imageRes = await createImage({ variables: { address: newImageAddress.current.value }});
            image = imageRes.data.createImage.id;
          }
          console.log(newTitle.current.value);
          const threadRes = await createThread({ variables: { thread: {board: router.query.board, name: newTitle.current.value, article: {title: newTitle.current.value, content: newContent.current.value, images: [image]}}}});
          router.push(`/threads/${threadRes.data.createThread.id}`);
        }}
      >
        <Box align="center">
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </Layout>
  );
}

export default withAuth(CreateThread);