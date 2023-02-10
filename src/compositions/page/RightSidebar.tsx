import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Box from '@/components/layout/Box';
import Card from '@/components/paper/Card';

const Sidebar = styled.div`
  display: block;
  margin: 0 auto;
  padding-top: 16px;
  width: 100%;
  &:last-child {
    padding-bottom: 16px;
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
        {Array.from(Array(50).keys()).map((count: number) => (
          <Box
            horizontalPaddingLevel={2}
            verticalPaddingLevel={2}
          >
            Test {count}
          </Box>
        ))}
      </Card>
    </Sidebar>
  );
}
