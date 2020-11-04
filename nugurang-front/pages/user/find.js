import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import { gql, useMutation, useLazyQuery } from '@apollo/client';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import SearchBox from '../../components/SearchBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamList from '../../components/TeamList';
import UserInfoBox from '../../components/UserInfoBox'
import UserList from '../../components/UserList'
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
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));


export const GET_USER_BY_NAME = gql`
  query getUserByName($name: String!) {
    getUserByName(name: $name) {
      id
      name
      email
      image {
        id
        address
      }
    }
  }
`;


function FindUser() {
  const router = useRouter();
  const classes = useStyles();
  const keywordName = useRef(null);

  const results = [[null, useLazyQuery(GET_USER_BY_NAME)]];
  const [getUserByName] = results.map(result => result[0]);
  const users = results[0][1].data;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleKeywordNameChange() {
    keywordName.current.focus();
  }

  return (
    <Layout>
      <SectionTitleBar title="Find user" backButton />
      <SectionBox border={false}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item xs>
            <FormControl fullWidth variant="filled">
              <TextField
                className={classes.textField}
                inputProps={{ style: { fontFamily: "Ubuntu" } }}
                InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
                inputRef={keywordName}
                label="Enter username"
                variant="outlined"
                onClick={handleKeywordNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <form
              onSubmit={() => getUserByName({ variables: {name: keywordName.current.value}})}
            >
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
          </Grid>
        </Grid>
      </SectionBox>
      {
        users
        ? (
          <SectionBox>
            <UserList items={users}/>
          </SectionBox>
        )
        : <>No one found</>
      }
    </Layout>
  );
}

export default withAuth(FindUser);