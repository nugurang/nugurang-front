import Head from "next/head";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavBar from './BottomNavBar'


const styles = {
  root: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '10px',
    padding: '10px',
    variant: 'outlined',
  },
};

const Layout = props => {
  return (
    <div className="Layout">
      <Head>
        <title>Nugurang</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box>
          {props.children}
        </Box>
        <Box m='100px' />
      </Container>
      <BottomNavBar />
    </div>
  );
};

export default withStyles(styles)(Layout);