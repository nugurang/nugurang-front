import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';

const useStyles = makeStyles(() => ({
  icon: {
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
    noWrap: 'true',
  },
  listThirdlyTypography: {
    fontFamily: "Ubuntu",
    fontSize: 12,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
}));

export default function NotificationList({ items }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <List>
      {[items].flat().map((item) => (
        <Grid item key={item.id}>
          <ListItem
            alignItems="flex-start"
            button
            onClick={() => router.push(`${item.link}`)}
          >
            <Grid container>
              <Grid item>
                <ListItemIcon>
                  <MessageOutlinedIcon
                    className={classes.icon}
                  />
                </ListItemIcon>
              </Grid>
              <Grid item xs>
                <Box display="flex" flexWrap="wrap">
                  <ListItemText
                    primary={(
                      <Box display='block'>
                        <Typography className={classes.listPrimaryTypography}>
                          {item.title}
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
                <Grid item xs={12}>
                  <Typography className={classes.listThirdlyTypography}>
                    {item.createdAt}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        </Grid>
      ))}
    </List>
  );
}
