import Typography from '@mui/material/Typography';

interface ButtonProps {
  children: JSX.Element | string;
  variant: string;
  component: string;
}

export default (props: ButtonProps) => {
  const {
    children,
  } = props;
 
  return (
    <Typography>{children}</Typography>
  );
}
