import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Box from '@/components/layout/Box';
import Card from '@/components/layout/Card';

const Sidebar = styled.div`
  display: block;
  margin: 0 auto;
  padding-top: 24px;
  width: 100%;
  &:last-child {
    padding-bottom: 24px;
  }
`;

interface Props {
}
export default (props: Props) => {
  const {
  } = props;

  return (
    <Sidebar>
      <Card>
        <Box
          horizontalPaddingLevel={2}
          verticalPaddingLevel={2}
        >
        </Box>
      </Card>
    </Sidebar>
  );
}
