import styled from '@emotion/styled';
import Avatar from '@/components/button/Avatar';
import Tooltip from '@/components/layout/Tooltip';
import { oAuth2Login, logout } from '@/services/oAuth2/index';
import SessionBriefDashboard from './SessionBriefDashboard';
import type { GetCurrentUserResponseData } from '@/services/api/user';

export const headerHeight = '48px';

interface StatusBarProps {
  show?: boolean;
}
const StatusBarOuterWrap = styled.div<StatusBarProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: relative;
  height: 48px;
  z-index: 200;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const StatusBarBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
`;
const StatusBarInnerWrap = styled.div<StatusBarProps>`
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
const StatusBarContentLeft = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
`;
const StatusBarContentRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
`;

interface Props {
  show?: boolean;
  currentUser?: GetCurrentUserResponseData;
}
export default (props: Props) => {
  const {
    show,
    currentUser,
  } = props;

  return (
    <StatusBarOuterWrap show={show}>
      <StatusBarBackground />
      <StatusBarInnerWrap>
        <StatusBarContentLeft>
          nugurang(αlpha)
        </StatusBarContentLeft>
        <StatusBarContentRight>
          <Tooltip content={<SessionBriefDashboard currentUser={currentUser} onClickLogoutButton={logout} />}>
            <Avatar src='' alt='Test' size={`calc(${headerHeight} - 16px)`}/>
          </Tooltip>
        </StatusBarContentRight>
      </StatusBarInnerWrap>
    </StatusBarOuterWrap>
  );
}
