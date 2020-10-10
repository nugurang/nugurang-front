import Head from "next/head";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavBar from './BottomNavBar'

const Layout = props => {
  const appTitle = `> NUGURANG`;

  return (
    <div className="Layout">
      <Head>
        <title>Nugurang</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="Content">{props.children}</div>
      <BottomNavBar />
    </div>
  );
};

export default Layout