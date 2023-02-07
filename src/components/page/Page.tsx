import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Box from '../layout/Box';
import Card from '../layout/Card';

const Page = styled.div`
  margin: 0 auto;
  padding-top: 24px;
  width: 100%;
  max-width: 720px;
  &:last-child {
    padding-bottom: 24px;
  }
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
          horizontalPaddingLevel={setPadding ? 2 : 0}
          verticalPaddingLevel={setPadding ? 2 : 0}
        >
          {children}
        </Box>
      </Card>
    </Page>
  );
}
