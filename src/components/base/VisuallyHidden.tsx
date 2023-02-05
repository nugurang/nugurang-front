import { ReactNode } from 'react';
import styled from '@emotion/styled';

const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  outline: 0;
  outline-offset: 0;
  overflow: hidden;

  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
`;

interface Props {
  children: ReactNode | string;
}
export default (props: Props) => {
  const {
    children,
  } = props;

  return (
    <VisuallyHidden>
      {children}
    </VisuallyHidden>
  );
}
