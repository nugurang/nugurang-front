import Head from "next/head";
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BottomNavBar from './BottomNavBar'

const styles = {};

function Layout({ /* classes, */ children, title }) {
  return (
    <div className="Layout">
      <Head>
        <title>{title || 'Nugurang'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxWidth="sm">
        {children}
      </Container>
      <BottomNavBar />
    </div>
  );
};

export default withStyles(styles)(Layout);
