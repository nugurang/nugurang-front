import React from 'react';
import { makeStyles } from '@material-ui/styles';
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

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


export default function UserGroupInfoCard({ primary, secondary, title, users, onClick=null, onAddButtonClick=null}) {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <Grid container alignItems="center" direction="row" justify="flex-start">
        <Grid item xs>
          <CardActionArea>
            <div onClick={onClick}>
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
            </div>
          </CardActionArea>
        </Grid>
        {
          users
          ? (
            <>
              <Grid item align="right">
                <AvatarGroup max={3} spacing="small">
                  {users.map(user => (
                    <Avatar key={user.id} alt={user.name} src={user.image ? user.image.address : null} />
                  ))}
                </AvatarGroup>
              </Grid>
            </>
          )
          : ( <></> )
        }
        <Box display={onAddButtonClick ? "block" : "none"}>
        <Grid item align="right">
          <IconButton color="primary" aria-label="invite user" component="span" onClick={onAddButtonClick}>
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        </Box>
      </Grid>
    </Card>
  );
}