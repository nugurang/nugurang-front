import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Box from '@/components/layout/Box';
import Card from '@/components/layout/Card';

const Page = styled.div`
  padding-top: 24px;
  width: 100%;
  overflow: visible;
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
