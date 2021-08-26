import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextsmsIcon from '@material-ui/icons/Textsms';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { mutateToBackend } from "../../utils/requestToBackend";
import { CreateArticleMutationBuilder } from '../../queries/article';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

export const getServerSideProps = withAuthServerSide();

function CreateArticle() {
  const router = useRouter();
  const newContent = useRef(null);

  function handleNewContentChange() {
    newContent.current.focus();
  }

  return (
    <Layout>
      <SectionTitleBar title="Comment" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<PageTitleBar title="Leave comment" icon={<TextsmsIcon />} />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputRef={newContent}
                  label="Enter comment"
                  variant="outlined"
                  onClick={handleNewContentChange}
                  multiline
                  rows={8}
                  component="pre"
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await mutateToBackend({
              mutation: new CreateArticleMutationBuilder().build(),
              variables: {
                article: {
                  content: newContent.current.value,
                  images: []
                },
                thread: router.query.thread
              }
            });
            router.push(`/threads/${router.query.thread}`);
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

export default CreateArticle;
