import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'array-flat-polyfill';

import UserGroupInfoCard from './UserGroupInfoCard'


export default function TeamList({ items }) {
  const router = useRouter();
  return (
    <List>
      {[items].flat().map((item) => (
        <ListItem
          key={item.id}
          alignItems="flex-start"
          button
          onClick={() => router.push(`/teams/${item.id}`)}
        >
          <Grid container alignItems="center" direction="row" justify="flex-start">
            <Grid item xs>
              <UserGroupInfoCard
                title={item.name}
                primary={item.name}
                secondary={item.name}
                users={item.users}
              />
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}