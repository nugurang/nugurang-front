import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ArticleLeader from './ArticleLeader';
import ArticleList from './ArticleList';

const useStyles = makeStyles(() => ({
  accordion: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0.5rem',
    variant: 'outlined',
  },
  accordionTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 300,
    margin: '0rem',
    wordWrap: "break-word",
  },
  box: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem',
    variant: 'outlined',
  },
  card: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0.5rem',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 300,
    margin: '0rem',
    wordWrap: "break-word",
  },
  cardContentTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    margin: '0rem',
  },
}));


export default function ThreadBox({ articleLeader, articles, like, topic, view, vote }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.box}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12}>
            { articleLeader && <ArticleLeader article={articleLeader} like={like} topic={topic} view={view} vote={vote} /> }
            <ArticleList items={articles} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
