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

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend, mutateToBackend } from "../../utils/requestToBackend";
import { CreateImageMutationBuilder } from '../../queries/image';
import {
  GetThreadQueryBuilder,
  UpdateThreadMutationBuilder,
} from '../../queries/thread';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

export const getServerSideProps = withAuthServerSide( async ({ context }) => {
  const threadResult = await queryToBackend({
    context,
    query: new GetThreadQueryBuilder().withFirstArticle().build(),
    variables: {
      id: context.query.thread,
    },
  });

  if (!threadResult.data.getThread) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      thread: threadResult.data.getThread,
    },
  };
});

function Update({ thread }) {
  const router = useRouter();
  const newName = useRef(null);
  const newContent = useRef(null);
  const newImageAddress = useRef(null);

  function handleNewTitleChange() {
    newName.current.focus();
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
        <SectionBox titleBar={<SectionTitleBar title="Edit name" icon={<TitleIcon />} />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={thread.firstArticle.title}
                  inputRef={newName}
                  label="Enter name"
                  variant="outlined"
                  onClick={handleNewTitleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Edit content" icon={<NotesIcon />} />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={thread.firstArticle.content}
                  inputRef={newContent}
                  label="Enter content"
                  variant="outlined"
                  onClick={handleNewContentChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>


        <SectionBox titleBar={<SectionTitleBar title="Edit image link" icon={<ImageIcon />} />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={thread.firstArticle.image ? thread.firstArticle.image.address : null}
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
              const imageResponse = await mutateToBackend({
                mutation: new CreateImageMutationBuilder().build(),
                variables: {
                  address: newImageAddress.current.value
                }
              });
              image = imageResponse.data.createImage.id;
            }
            const threadResponse = await mutateToBackend({
              mutation: new UpdateThreadMutationBuilder().build(),
              variables: {
                id: thread.id,
                thread: {
                  name: newName.current.value,
                  firstArticle: {
                    title: newName.current.value,
                    content: newContent.current.value,
                    images: []
                  }
                }
              }
            });
            router.push(`/threads/${thread.id}`);
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

export default Update;
