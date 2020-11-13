import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import TextsmsIcon from '@material-ui/icons/Textsms';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import withAuth from '../../components/withAuth';


export const CREATE_ARTICLE = gql`
  mutation createArticle($article: ArticleInput!, $thread: ID!) {
    createArticle (article: $article, thread: $thread) {
      id
    }
  }
`;

function CreateArticle() {
  const router = useRouter();
  const newContent = useRef(null);

  const results = [useMutation(CREATE_ARTICLE)];
  const [createArticle] = results.map(result => result[0]);

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleNewContentChange() {
    newContent.current.focus();
  }

  return (
    <Layout>
      <SectionTitleBar title="Comment" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<PageTitleBar title="Leave comment" icon=<TextsmsIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputRef={newContent}
                  label="Enter comment"
                  variant="outlined"
                  onClick={handleNewContentChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await createArticle({ variables: {article: {content: newContent.current.value, images: []}, thread: router.query.thread}});
            router.push(`/threads/${router.query.thread}`);
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

export default withAuth(CreateArticle);