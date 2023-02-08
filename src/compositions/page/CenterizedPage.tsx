import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Card from '@/components/layout/Card';

const Box = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: ReactNode | string;
  setPadding?: boolean;
}
export default (props: Props) => {
  const {
    children,
  } = props;

  return (
    <Box>
      <Card>
        {children}
      </Card>
    </Box>
  );
}
