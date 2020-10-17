import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SectionTitleBox from "./SectionTitleBox";

const styles = {
  textField: {
    '& label.Mui-focused': {
      color: 'purple',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'purple',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      },
    },
  },
};


function SectionTitleBoxWithTextField(props) {
  const { classes, title } = props;
  return (
    <SectionTitleBox title={title}>
      <FormControl fullWidth variant="filled">
        <TextField
          className={classes.textField}
          inputProps={{ style: { fontFamily: "Ubuntu" } }}
          InputLabelProps={{ style: { fontFamily: "Ubuntu" } }}
          label={props.title}
          variant="outlined"
        />
      </FormControl>
    </SectionTitleBox>
  );
}

export default withStyles(styles)(SectionTitleBoxWithTextField);
