import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '2rem',
    width: '2rem',
  },
  box: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '0rem',
    variant: 'outlined',
  },
  icon: {
    backgroundColor: "white",
    color: "black",
    height: '2.5rem',
    width: '2.5rem',
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

export default function BaseListItem({ avatar, avatarDescription, circleIcon, dense, icon, primary, onClick, secondary }) {
  const classes = useStyles();
  return (
    <ListItem
      alignItems="center"
      button
      dense={dense}
      onClick={onClick}
    >
      <Box display={avatar && !icon ? "block" : "none"}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}
            alt={avatarDescription || null}
            src={avatar}
            variant={circleIcon ? "circle" : "square"}
          />
        </ListItemAvatar>
      </Box>
      <Box display={icon && !avatar ? "block" : "none"}>
        <ListItemIcon className={classes.icon} fontSize="large">
          {icon}
        </ListItemIcon>
      </Box>
      <Box display="flex" flexWrap="wrap">
        <ListItemText
          primary={(
            <Box display={primary ? "block" : "none"}>
              <Typography className={classes.listPrimaryTypography}>
                {primary}
              </Typography>
            </Box>
          )}
          secondary={(
            <Box display={secondary ? "block" : "none"}>
              <Typography className={classes.listSecondaryTypography}>
                {secondary}
              </Typography>
            </Box>
          )}
        />
      </Box>
    </ListItem>
  );
}