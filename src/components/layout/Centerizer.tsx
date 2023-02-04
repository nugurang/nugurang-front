import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface CenterizerProps {
  horizontally?: boolean;
  vertically?: boolean;
}
const Centerizer = styled.div<CenterizerProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;
  ${props => (props.horizontally ? 'justify-content: center;' : '')}
  ${props => (props.vertically ? 'align-items: center;' : '')}
`;

interface ContainerProps {
  children: ReactNode | string;
  horizontally?: boolean;
  vertically?: boolean;
}
export default (props: ContainerProps) => {
  const {
    children,
    horizontally,
    vertically,
  } = props;

  return (
    <Centerizer
      horizontally={horizontally ?? false}
      vertically={vertically ?? false}
    >
      {children}
    </Centerizer>
  );
}
