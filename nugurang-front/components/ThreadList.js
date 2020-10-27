import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import StatCounterBox from './StatCounterBox';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '2.5rem',
    width: '2.5rem',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  listPrimaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  listSecondaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));

export default function ThreadList({ items }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <List>
      {[items].flat().map((item) => (
        <Grid item key={item.id}>
          <ListItem
            alignItems="flex-start"
            button
            onClick={() => router.push(`/threads/${item.id}`)}
          >
            <Grid container>
              <Grid item>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}
                    alt={item.user.name}
                    src={item.image?.address}
                    variant="circle"
                  />
                </ListItemAvatar>
              </Grid>
              <Grid item xs>
                <Box display="flex" flexWrap="wrap">
                  <ListItemText
                    primary={(
                      <Box display={item.name ? "block" : "none"}>
                        <Typography className={classes.listPrimaryTypography}>
                          {item.name}
                        </Typography>
                      </Box>
                    )}
                    secondary={(
                      <Box display={item.content ? "block" : "none"}>
                        <Typography className={classes.listSecondaryTypography}>
                          {item.content}
                        </Typography>
                      </Box>
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <StatCounterBox image={item.image} upCount={item.upCount} />
              </Grid>
            </Grid>
          </ListItem>
        </Grid>
))}
    </List>
  );
}
