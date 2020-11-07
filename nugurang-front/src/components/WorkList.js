import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'array-flat-polyfill';

import NoContentsBox from './NoContentsBox'
import UserGroupInfoCard from './UserGroupInfoCard'


export default function WorkList({ items }) {
  const router = useRouter();
  return (
    <>
      {
        items && items.length > 0
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
                      onClick={() => router.push(`/works/${item.id}`)}
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