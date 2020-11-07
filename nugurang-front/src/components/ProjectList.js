import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'array-flat-polyfill';

import UserGroupInfoCard from './UserGroupInfoCard'


export default function ProjectList({ items }) {
  const router = useRouter();
  return (
    <>
      {
        items
        ? (
          <List>
            {[items].flat().map((item) => (
              <ListItem
                key={item.id}
                alignItems="flex-start"
              >
                <Grid container alignItems="center" direction="row" justify="flex-start">
                  <Grid item xs>
                    <UserGroupInfoCard
                      title={item.name}
                      primary={item.name}
                      secondary={item.name}
                      users={item.users}
                      onClick={() => router.push(`/projects/${item.id}`)}
                      onAddButtonClick={() => router.push({pathname: "/projects/invite", query: { id: item.id }})}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          )
        : (
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Typography className={classes.noContentsTypography} align="center">
                No contents :(
              </Typography>
            </Grid>
          </Grid>
        )
      }
    </>
  );
}