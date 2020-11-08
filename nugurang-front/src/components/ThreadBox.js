import React from 'react';
import Grid from '@material-ui/core/Grid';

import ArticleLeader from './ArticleLeader';
import ArticleList from './ArticleList';


export default function ThreadBox({ articleLeader, articles, like, topic, view, vote }) {
  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={12}>
        { articleLeader && <ArticleLeader article={articleLeader} like={like} topic={topic} view={view} vote={vote} /> }
        <ArticleList items={articles} />
      </Grid>
    </Grid>
  );
}
