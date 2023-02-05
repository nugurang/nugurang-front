import { ReactNode } from 'react';
import Box from '../layout/Box';
import Card from '../layout/Card';

interface Props {
  children: ReactNode | string;
  setPadding?: boolean;
}
export default (props: Props) => {
  const {
    children,
    setPadding,
  } = props;

  return (
    <Box
      centerizeHorizontally
      centerizeVertically
    >
      <Card>
        <Box
          width='400px'
          maxWidth='100vw'
          setPaddingHorizontally={setPadding ?? false}
          setPaddingVertically={setPadding ?? false}
        >
          {children}
        </Box>
      </Card>
    </Box>
  );
}
