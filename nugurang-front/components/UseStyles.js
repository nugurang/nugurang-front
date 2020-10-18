import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app_bar: {
    top: 'auto',
    bottom: 0,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  box_card: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    variant: 'outlined',
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(1),
  },
  card_media_image_top: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card_title: {
    alignSelf: "end",
    textAlign: "center"
  },
  favicon: {
    height: 0,
    paddingTop: '100%', // 1:1
  },
  paper_background: {
    alignItems: 'center',
    border: '0',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(1),
  },
  paper_card: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    variant: 'outlined',
  },
  paper_list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    variant: 'outlined',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  typography_title: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

export default useStyles;
