import React from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'array-flat-polyfill';

import NoContentsBox from './NoContentsBox'
import UserGroupInfoCard from './UserGroupInfoCard'


export default function ProjectList({ items }) {
  const router = useRouter();
  return (
    <>
      {
        items && items.length > 0
        ? (
          <List>
            {[items].flat().map((item) => (
              <ListItem
                key={item.id}
                alignItems="flex-start"
              >
                <Box flexGrow={1}>
                  <UserGroupInfoCard
                    title={item.name}
                    primary={item.name}
                    secondary={item.name}
                    users={item.users}
                    onClick={() => router.push(`/projects/${item.id}`)}
                    onAddButtonClick={() => router.push({pathname: "/projects/invite", query: { id: item.id }})}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
          )
        : <NoContentsBox />
      }
    </>
  );
}