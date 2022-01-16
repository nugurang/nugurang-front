import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';

import ArticleStatCounterBox from './ArticleStatCounterBox';


export default function ArticleListItem({ article }) {
  const router = useRouter();
  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={article.onClick}
    >
      <Grid container alignItems="flex-start">
        <div onClick={() => router.push(`/user/${article.user.id}`)}>
          <Grid article>
            <Avatar
              alt={article.user.name}
              src={article.user.image ? article.user.image.address : null}
              variant="circle"
            >
              {article.user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
        </div>
        <Grid item xs={10}>
          <Box display="flex" flexWrap="wrap">
            <ListItemText
              primary={(
                <div onClick={() => router.push(`/user/${article.user.id}`)}>
                  <Box display={article.user? "block" : "none"}>
                    <Typography variant="body1">
                      {article.user.name}
                    </Typography>
                  </Box>
                </div>
              )}
              secondary={(
                <Box display={article.content ? "block" : "none"}>
                  <Typography variant="body2">
                    {article.content}
                  </Typography>
                </Box>
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}