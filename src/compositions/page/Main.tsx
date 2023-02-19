import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface MainProps {
  fullHeight?: boolean;
}
const Main = styled.main<MainProps>`
  margin-top: 16px;
  &>*{
    margin-top: 16px;
  }
  &>*:first-child{
    margin-top: 0;
  }

  @media (max-width: 1280px) {
    flex-grow: 1;
    flex-basis: 768px;
    max-width: 768px;
    position: relative;
  }
  @media (min-width: 1280px) {
    flex-basis: 1280px;
    flex-shrink: 1;
    min-width: 768px;
    width: 1280px;
    position: relative;
    overflow: scroll;
  }

  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

interface Props {
  children: ReactNode | string;
  fullHeight?: boolean;
}
export default (props: Props) => {
  const {
    children,
    fullHeight,
  } = props;

  return (
    <Main fullHeight={fullHeight ?? false}>
      {children}
    </Main>
  );
}
