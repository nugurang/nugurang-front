import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ImageIcon from '@material-ui/icons/Image';

import Layout from '../../components/Layout';
import BaseButton from '../../components/BaseButton';
import ImageUploadingBox from '../../components/ImageUploadingBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import withAuth from '../../components/withAuth';


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

export const GET_BOARD = gql`
  query getBoardByName($name: String!) {
    getBoardByName(name: $name) {
      id
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

export const CREATE_THREAD = gql`
  mutation createThread($board: ID!, $name: String!) {
    createThread (board: $board, name: $name) {
      id
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle($thread: ID!, $content: String!) {
    createArticle (thread: $thread, content: $content) {
      id
    }
  }
`;

function CreateThread() {
  const router = useRouter();
  const classes = useStyles();
  const newTitle = useRef(null);
  const newContent = useRef(null);
  const newImageAddress = useRef(null);

  const results = [[null, useQuery(GET_BOARD, {variables: {name: router.query.board}})], useMutation(CREATE_IMAGE), useMutation(CREATE_THREAD), useMutation(CREATE_ARTICLE)];
  const [getBoard, createImage, createThread, createArticle] = results.map(result => result[0]);
  const boardData = results[0][1].data;

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
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  className={classes.textField}
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newTitle}
                  label="Enter title"
                  variant="outlined"
                  onClick={handleNewTitleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </SectionBox>

      <SectionBox titleBar={<SectionTitleBar title="Add content" icon=<GroupAddIcon /> />}>
        <Box className={classes.box}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  className={classes.textField}
                  inputProps={{ style: { fontFamily: "Ubuntu" } }}
                  InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                  inputRef={newContent}
                  label="Enter content"
                  variant="outlined"
                  onClick={handleNewContentChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </SectionBox>


      <SectionBox titleBar={<SectionTitleBar title="Add image link" icon=<ImageIcon /> />}>
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
        onSubmit={async (e) => {
          e.preventDefault();
          let image;
          if (newImageAddress.current.value) {
            const imageRes = await createImage({ variables: { address: newImageAddress.current.value }});
            image = imageRes.data.createImage.id;
          }
          let boardId = boardData.getBoardByName.id;
          const threadRes = await createThread({ variables: {board: boardId, name: newTitle.current.value}});
          let threadId = threadRes.data.createThread.id;
          const articleRes = await createArticle({ variables: {thread: threadId, title: newTitle.current.value, content: newContent.current.value}});
          router.push(`/threads/${threadId}`);
        }}

      >
        <Box className={classes.box} align="center">
          <BaseButton
            label="Submit"
            type="submit"
          />
        </Box>
      </form>
    </Layout>
  );
}

export default withAuth(CreateThread);