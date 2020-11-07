import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'array-flat-polyfill';

import NoContentsBox from './NoContentsBox'
import UserGroupInfoCard from './UserGroupInfoCard'


export default function TeamList({ items, link=null, buttonLink=null }) {
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
                      users={item.getUsers}
                      onClick={() => link ? router.push(`${link}/${item.id}`) : null}
                      onAddButtonClick={() => buttonLink ? router.push({pathname: `${buttonLink}`, query: { team: item.id }}) : null}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          )
        : (
           <NoContentsBox/>
        )
      }
    </>
  );
}