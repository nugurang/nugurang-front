import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SectionTitleBox from "./SectionTitleBox";

const styles = {
  avatar: {
    backgroundColor: "white",
    color: "black",
    height: '30px',
    width: '30px',
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '5px',
    padding: '5px 10px',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  hr: {
    backgroundColor: "gray",
    height: 2,
  },
  typography: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
};


function SectionTitleBoxWithButton(props) {
  const { classes, label, ...other } = props;
  return (
    <SectionTitleBox {...other}>
      <Button className={classes.button}>
        <Typography className={classes.buttonTypography}>{label}</Typography>
      </Button>
    </SectionTitleBox>
  );
}

export default withStyles(styles)(SectionTitleBoxWithButton);
