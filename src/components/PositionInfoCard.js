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


export default function PositionInfoCard({ position }) {
  const router = useRouter();
  return (
    <Card>
      <Box display="flex" alignItems="center">
        <CardActionArea onClick={() => position.onClick ? position.onClick() : null} flexGrow={1}>
          <CardContent>
            <Grid container spacing={2} alignItems="center" direction="row" justify="flex-start">
              <Grid item justify="flex-start">
                <Avatar
                  alt={position.name}
                  src={position.image ? position.image.address : null}
                  variant="circle"
                >
                  {position.name.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs justify="flex-start">
                <Typography variant="body1">
                  {position.name}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Box>
    </Card>
  );
}