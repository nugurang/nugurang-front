import Head from "next/head";
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import BottomNavBar from './BottomNavBar'

const useStyles = makeStyles(() => ({
  layoutBox: {
    margin: "0rem 0rem 7.5rem 0rem",
    minHeight: "85vh",
  },
}));

export default function Layout({ children, title }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.layoutBox}>
        <Head>
          <title>{title || 'Nugurang'}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Container maxWidth="sm">
          {children}
        </Container>
      </Box>
      <BottomNavBar />
    </>
  );
};