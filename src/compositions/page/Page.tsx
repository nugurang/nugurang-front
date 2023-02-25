import { ReactNode } from 'react';
import styled from '@emotion/styled';

const PageOuterWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 1280px;
  height: 100%;

  margin: 0 auto;
  flex-grow: 1;
`;

const PageInnerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;

  position: relative;
  max-width: 1280px;
  gap: 8px;
`;

interface Props {
  children: ReactNode | string;
}
export default (props: Props) => {
  const {
    children,
  } = props;

  return (
    <PageOuterWrap>
      <PageInnerWrap>
        {children}
      </PageInnerWrap>
    </PageOuterWrap>
  );
}
