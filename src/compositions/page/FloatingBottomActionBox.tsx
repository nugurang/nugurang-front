import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface FloatingBottomActionBoxProps {
  show?: boolean;
}
const FloatingBottomActionBox = styled.div<FloatingBottomActionBoxProps>`
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  margin: 16px;
  &>*:not(:first-child) {
    margin-left: 2px;
  }
`;

interface Props {
  children: ReactNode | string;
  show?: boolean;
}
export default (props: Props) => {
  const {
    children,
    show = true,
  } = props;

  return (
    <FloatingBottomActionBox show={show}>
      {children}
    </FloatingBottomActionBox>
  );
}
