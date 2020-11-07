import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import { gql, useMutation, useLazyQuery } from '@apollo/client';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import BaseButton from '../../components/BaseButton';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import SearchBox from '../../components/SearchBox';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamList from '../../components/TeamList';
import UserInfoBox from '../../components/UserInfoBox'
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

const TEST_USERS=[
  {
    id: 1,
    name: "User 1",
    image: "/static/images/sample_2.jpg",
    followers: 10,
    followings: 20,
    bio: "Bio"
  },
  {
    id: 2,
    name: "User 2",
    image: "/static/images/sample_3.jpg",
    followers: 10,
    followings: 20,
    bio: "Bio"
  },
  {
    id: 3,
    name: "User 3",
    image: "/static/images/sample_4.jpg",
    followers: 10,
    followings: 20,
    bio: "Bio"
  },
];



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

export const UPDATE_TEAM = gql`
  mutation updateTeam($team: ID!, $name: String!, $users: [ID]!) {
    updateTeam(team: $team, name: $name, users: $users) {
      team {
        id
      }
    }
  }
`;


function InviteUserToTeam() {
  const router = useRouter();
  const classes = useStyles();
  const keywordName = useRef(null);

  const results = [[null, useLazyQuery(GET_USER_BY_NAME)], useMutation(UPDATE_TEAM)];
  const [getUserByName, updateTeam] = results.map(result => result[0]);
  const user = results[0][1].data;

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
      <SectionTitleBar title="Invite user" backButton />
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
        user
        ? (
          <SectionBox>
            <UserInfoBox user={user}/>
          </SectionBox>
        )
        : <></>
      }
    </Layout>
  );
}

export default withAuth(InviteUserToTeam);