import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'array-flat-polyfill';

import UserGroupInfoCard from './UserGroupInfoCard'


export default function TaskList({ items }) {
  return (
    <>
      {
        items
        ? (
          <List>
            {[items].flat().map((item) => (
              <ListItem key={item.id} alignItems="flex-start">
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
          )
        : <NoContentsBox/>
      }
    </>
  );
}