import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Box from '../layout/Box';
import Card from '../layout/Card';

const Page = styled.div`
  margin: 0 auto;
  padding: 16px 0;
  width: 100%;
  max-width: 720px;
`;

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
    <Page>
      <Card>
        <Box
          setPaddingHorizontally={setPadding ?? false}
          setPaddingVertically={setPadding ?? false}
        >
          {children}
        </Box>
      </Card>
    </Page>
  );
}
