import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import BottomNavBarLayout from '../components/BottomNavBarLayout';
import useStyles from '../components/UseStyles';


const signInButtons = [
  {
  	name: "Facebook",
    content: "Sign in with Facebook",
    favicon: "/static/favicons/favicon-facebook.png",
  },
  {
  	name: "GitHub",
    content: "Sign in with GitHub",
    favicon: "/static/favicons/favicon-github.png",
  },
  {
  	name: "Kakao",
    content: "Sign in with Kakao",
    favicon: "/static/favicons/favicon-kakao.png",
  },
];

function SignInField() {
  const classes = useStyles();
  return (
  	<Box width={2/3}>
	  <Grid container spacing={2} alignItems="center" justify="center">
	    <Grid item xs={12}>
	      <Typography variant="h4" style={{textAlign: "center"}} gutterBottom>
	        Sign In
	      </Typography>

          {signInButtons.map(signInButton => (
	        <Grid item xs={12}>
	          <Button
	            className={classes.button}
	            color="default"
	            fullWidth
	            size="large"
	            startIcon={
	              <Avatar alt={signInButton.name}
	              src={signInButton.favicon}
	              variant="square"
	            />}
	            type="submit"
	            variant="outlined"
	          >
	            {signInButton.content}
	          </Button>
            </Grid>
          ))}

	    </Grid>
	  </Grid>
	</Box>
  );
}


export default function SignIn() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <BottomNavBarLayout>
        <Paper className={classes.paper_background} variant="outlined">

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Box className={classes.box_card} >
                <SignInField />
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </BottomNavBarLayout>
    </Container>
  );
}
