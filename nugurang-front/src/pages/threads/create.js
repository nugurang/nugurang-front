import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ImageIcon from '@material-ui/icons/Image';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { mutateToBackend } from "../../utils/requestToBackend";
import { CreateImageMutationBuilder } from '../../queries/image';
import { CreateThreadMutationBuilder } from '../../queries/thread';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

export const getServerSideProps = withAuthServerSide();

function CreateThread() {
  const router = useRouter();
  const newTitle = useRef(null);
  const newContent = useRef(null);
  const newImageAddress = useRef(null);

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
      <PageTitleBar title="Create new thread" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add title" icon={<GroupAddIcon />} />}>
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

        <SectionBox titleBar={<SectionTitleBar title="Add content" icon={<GroupAddIcon />} />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputRef={newContent}
                  label="Enter content"
                  variant="outlined"
                  onClick={handleNewContentChange}
                  multiline
                  rows={8}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>


        <SectionBox titleBar={<SectionTitleBar title="Add image link" icon={<ImageIcon />} />}>
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
            const title = newTitle.current.value;
            const content = newContent.current.value;
            let images = [];
            if (newImageAddress.current.value) {
              const imageResponse = await mutateToBackend({
                mutation: new CreateImageMutationBuilder().build(),
                variables: {
                  address: newImageAddress.current.value
                }
              });
              images.push(Number(imageResponse.data.createImage.id));
            }
            const threadResponse = await mutateToBackend({
              mutation: new CreateThreadMutationBuilder().build(),
              variables: {
                board: router.query.board,
                thread: {
                  name: title,
                  firstArticle: {
                    title,
                    content,
                    images
                  }
                }
              }
            });
            router.push(`/threads/${threadResponse.data.createThread.id}`);
          }}
        >
          <Box align="center">
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </form>
      </Container>

    </Layout>
  );
}

export default CreateThread;
