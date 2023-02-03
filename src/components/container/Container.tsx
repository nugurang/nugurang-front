import { ReactNode } from 'react';
import Container from '@mui/material/Container';

interface ContainerProps {
  children: ReactNode | string;
}

export default (props: ContainerProps) => {
  const {
    children,
  } = props;

  return (
    <Container>
      {children}
    </Container>
  );
}
