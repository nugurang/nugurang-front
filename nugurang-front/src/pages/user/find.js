import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SearchIcon from '@material-ui/icons/Search';

import withAuthServerSide from '../../utils/withAuthServerSide';
import { queryToBackend } from "../../utils/requestToBackend";
import { GetUserByNameQueryBuilder } from '../../queries/user';

import Layout from '../../components/Layout';
import NoContentsBox from '../../components/NoContentsBox'
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoCard from '../../components/UserInfoCard'

export const getServerSideProps = withAuthServerSide();

function Find() {
  const router = useRouter();
  const keywordName = useRef(null);

  const [users, setUsers] = useState([]);

  function handleKeywordNameChange() {
    keywordName.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Find user" backButton />

      <Container maxWidth="md">
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
                  const response = await queryToBackend({
                    query: new GetUserByNameQueryBuilder().withFollows().build(),
                    variables: {
                      name: keywordName.current.value,
                    },
                  });
                  setUsers(response.data.getUserByName.map(user => {
                    return {
                      ...user,
                      onClick: () => router.push(`/user/${user.id}`),
                    };
                  }));
                }}
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
            <SectionTitleBar title="Results" icon={<FindInPageIcon />} />
          }
        >
          {
            users && (users.length)
            ? <Grid container>{[users].flat().map((user) => <Grid item xs={12} sm={6} md={4}><UserInfoCard user={user} /></Grid>)}</Grid>
            : <NoContentsBox />
          }
        </SectionBox>
      </Container>

    </Layout>
  );
}

export default Find;
