import React from 'react';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'array-flat-polyfill';


export default function UserInfoCard({ user }) {
  const router = useRouter();
  return (
    <Card>
      <Box display="flex" alignItems="center">
        <CardActionArea onClick={user.onClick ? user.onClick : null} flexGrow={1}>
          <CardContent>
            <Grid container spacing={2} alignItems="center" direction="row" justify="flex-start">
              <Grid item justify="flex-start">
                <Avatar
                  alt={user.name}
                  src={user.image ? user.image.address : null}
                  variant="circle"
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs justify="flex-start">
                <Typography variant="body1">
                  {user.name}
                </Typography>
                <Box display={user.email ? "block" : "none"}>
                  <Typography variant="body2">
                    {user.email}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Box>
    </Card>
  );
}