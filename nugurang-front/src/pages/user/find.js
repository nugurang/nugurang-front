import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { gql, useMutation, useLazyQuery } from '@apollo/client';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SearchIcon from '@material-ui/icons/Search';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox'
import SearchBox from '../../components/SearchBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamList from '../../components/TeamList';
import UserList from '../../components/UserList'
import withAuth from '../../components/withAuth';

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
      biography
      getFollowers(page:0, pageSize:100) {
        id
      }
      getFollowings(page:0, pageSize:100) {
        id
      }
    }
  }
`;


function FindUser() {
  const router = useRouter();
  const keywordName = useRef(null);

  const results = [useLazyQuery(GET_USER_BY_NAME)];
  const [getUserByName] = results.map(result => result[0]);

  const userData = results[0][1].data;
  const users = userData && userData.getUserByName ? [userData.getUserByName] : null;

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
                inputRef={keywordName}
                label="Enter username"
                variant="outlined"
                onClick={handleKeywordNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await getUserByName({ variables: {name: keywordName.current.value}})}
              }
            >
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
          </Grid>
        </Grid>
      </SectionBox>

      <SectionBox
        titleBar={
          <SectionTitleBar title="Result" icon=<FindInPageIcon /> />
        }
      >
        {
          users
          ? (
            <SectionBox>
              <UserList items={users} link="/user"/>
            </SectionBox>
          )
          : <NoContentsBox/>
        }
      </SectionBox>
    </Layout>
  );
}

export default withAuth(FindUser);