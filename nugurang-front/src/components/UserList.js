import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import NoContentsBox from './NoContentsBox'

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function UserList({ items, link=null }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <>
      {
        (items && (items.length != 0))
        ? (
          <List>
            {[items].flat().map((item) => (
              <ListItem
                key={item.id}
                alignItems="flex-start"
                button
                onClick={() => link ? router.push(`${link}/${item.id}`) : null}
              >
                <Grid container spacing={2} alignItems="center" direction="row" justify="flex-start">
                  <Grid item justify="flex-start">
                    <Avatar
                      alt={item.name}
                      src={item.image ? item.image.address : null}
                      variant="circle"
                    />
                  </Grid>
                  <Grid item xs justify="flex-start">
                    <Typography variant="body1">
                      {item.name}
                    </Typography>
                    <Box display={item.email ? "block" : "none"}>
                      <Typography variant="body2">
                        {item.email}
                      </Typography>
                    </Box>
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