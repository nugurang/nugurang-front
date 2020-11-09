import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export default function UserGroupInfoCard({ primary, secondary, title, users, onClick=null, onAddButtonClick=null}) {
  return (
    <Card>
      <Box display="flex" alignItems="center">
        <CardActionArea onClick={onClick} flexGrow={1}>
          <CardContent>
            <Typography variant="h6">
              {title}
            </Typography>
            <Box display={primary ? "block" : "none"}>
              <Typography variant="body1">
                {primary}
              </Typography>
            </Box>
            <Box display={secondary ? "block" : "none"}>
              <Typography variant="body2">
                {secondary}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        {
          users
          ? (
            <Box align="right">
              <AvatarGroup max={3} spacing="small">
                {users.map(user => (
                  <Avatar
                    key={user.id}
                    alt={user.name}
                    src={user.image ? user.image.address : null}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Box>
          )
          : ( <></> )
        }
        <Box display={onAddButtonClick ? "block" : "none"}>
          <Grid item align="right">
            <IconButton color="primary" aria-label="invite user" component="span" onClick={onAddButtonClick}>
              <AddCircleIcon />
            </IconButton>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
}