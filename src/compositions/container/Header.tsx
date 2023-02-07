import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import Avatar from '@/components/button/Avatar';
import Button from '@/components/button/Button';
import ButtonGroup from '@/components/button/ButtonGroup';
import Tooltip from '@/components/layout/Tooltip';
import { oAuth2Login, logout } from '@/services/oAuth2/index';
import SessionBriefDashboard from './SessionBriefDashboard';
import type { User } from '@/services/api/user';
import NavigationButtonGroup from './NavigationButtonGroup';

export const headerHeight = '48px';

interface HeaderProps {
  show?: boolean;
}
const HeaderOuterWrap = styled.div<HeaderProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: relative;
  height: 48px;
  z-index: 200;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
`;
const HeaderInnerWrap = styled.div<HeaderProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: calc(720px + 16px);
  margin: 0 auto;
  padding: 0 8px;
`;
const HeaderContentLeft = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
`;
const HeaderContentRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  &>*:not(:first-child) {
    margin-left: 4px;
  }
`;

interface Props {
  show?: boolean;
  currentUser?: User;
}
export default (props: Props) => {
  const {
    show,
    currentUser,
  } = props;

  const { t: commonTranslation } = useTranslation('common');
  const router = useRouter();

  return (
    <HeaderOuterWrap show={show}>
      <HeaderBackground />
      <HeaderInnerWrap>
        <HeaderContentLeft>
          nugurang(&alpha;lpha)
        </HeaderContentLeft>
        <HeaderContentRight>
          <NavigationButtonGroup />
          <Tooltip content={<SessionBriefDashboard currentUser={currentUser} onClickLogoutButton={logout} />}>
            <Avatar src='' alt='Test' size={`calc(${headerHeight} - 16px)`}/>
          </Tooltip>
        </HeaderContentRight>
      </HeaderInnerWrap>
    </HeaderOuterWrap>
  );
}
