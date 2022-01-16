import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


export default function BaseListItem({ primary, avatar=null, circleIcon=null, dense=false, icon=null, onClick=null, secondary=null }) {
  return (
    <ListItem
      alignItems="center"
      button
      dense={dense}
      onClick={onClick}
    >
      <Box display={avatar && !icon ? "block" : "none"}>
        <ListItemAvatar>
          <Avatar
            alt={primary || null}
            src={avatar}
            variant={circleIcon ? "circle" : "square"}
          />
        </ListItemAvatar>
      </Box>
      <Box display={icon && !avatar ? "block" : "none"}>
        <ListItemIcon fontSize="large">
          {icon}
        </ListItemIcon>
      </Box>
      <Box display="flex" flexWrap="wrap">
        <ListItemText
          primary={(
            <Box display={primary ? "block" : "none"}>
              <Typography variant="body1">
                {primary}
              </Typography>
            </Box>
          )}
          secondary={(
            <Box display={secondary ? "block" : "none"}>
              <Typography variant="body2">
                {secondary}
              </Typography>
            </Box>
          )}
        />
      </Box>
    </ListItem>
  );
}