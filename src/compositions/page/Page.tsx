import { ReactNode } from 'react';
import styled from '@emotion/styled';
import type { User } from '@/services/api/user';
import Sidebar from '../page/Sidebar';

const PageOuterWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  &>*:last-child {
    flex-grow: 1;
  }
  max-width: 1280px;
  margin: 0 auto;
`;

const PageInnerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  max-width: 1280px;
  gap: 8px;
`;

const Content = styled.div`
  margin-top: 16px;

  @media (max-width: 1280px) {
    flex-grow: 1;
    flex-basis: 768px;
    max-width: 768px;
    position: relative;
  }
  @media (min-width: 1280px) {
    min-width: 768px;
    max-width: 1280px;
    flex-grow: 1;
    flex-shrink: 1;
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
  currentUser?: User;
  centerizeHorizontally?: boolean;
  centerizeVertically?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
  wallpaperUrl?: string;
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
