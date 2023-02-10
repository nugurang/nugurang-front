import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';
import Avatar from '@/components/button/Avatar';
import Button from '@/components/button/Button';
import Tooltip from '@/components/layout/Tooltip';
import { Theme, ThemeContext } from '@/components/theme';
import { oAuth2Login, logout } from '@/services/oAuth2/index';
import SessionBriefDashboard from './SessionBriefDashboard';
import type { User } from '@/services/api/user';
import NavigationButtonGroup from './NavigationButtonGroup';
import { useContext, useState } from 'react';
import Box from '@/components/layout/Box';
import Dialog from '../common/Dialog';
import ButtonGroup from '@/components/button/ButtonGroup';

export const headerHeight = '60px';
export const headerSpacerHeight = '72px';

interface HeaderOuterWrapProps {
  theme: Theme;
}
const HeaderOuterWrap = styled.div<HeaderOuterWrapProps>`
  position: relative;
  height: ${headerHeight};
  max-height: ${headerHeight};
  width: 100%;
  max-width: 768px;
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
  margin: 0 auto;
`;

interface HeaderInnerWrapProps {
  theme: Theme;
  show?: boolean;
}
const HeaderInnerWrap = styled.div<HeaderInnerWrapProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-height: ${headerHeight};
  margin: 16px 8px 8px 8px;
  background-color: ${props => props.theme.palette.default.base};
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const HeaderContentLeft = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  margin-left: 8px;
  &>*:not(:first-child) {
    margin-left: 4px;
  }
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
    currentUser,
  } = props;
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { t: commonTranslation } = useTranslation('common');
  const [isSessionTooltipOpen, setSessionTooltipOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [isLogoutOngoing, setLogoutOngoing] = useState<boolean>(false);

  const handleClickLogoutButton = () => {
    setLogoutModalOpen(true);
  };
  const handleClickLogoutYesButton = () => {
    setLogoutOngoing(true);
    logout();
  };
  const handleClickLogoutNoButton = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <HeaderOuterWrap theme={theme}>
        <HeaderInnerWrap theme={theme}>
          <HeaderContentLeft>
            <Button
              fillVariant='text'
              palette='primary'
              onClick={() => router.push('/')}
            >
              nugurang(&alpha;lpha)
            </Button>
          </HeaderContentLeft>
          <HeaderContentRight>
            <NavigationButtonGroup />
            <Tooltip
              isOpen={isSessionTooltipOpen}
              setOpen={setSessionTooltipOpen}
              content={
                <SessionBriefDashboard
                  currentUser={currentUser}
                  isLogoutModalOpen={isLogoutModalOpen}
                  isLogoutOngoing={isLogoutOngoing}
                  onClickGoToMyAccountButton={() => router.push('/my-account')}
                  onClickLogoutButton={handleClickLogoutButton}
                />
              }
            >
              <Box centerizeVertically>
                <Avatar src='' alt={currentUser?.name} padding='8px' size={`calc(${headerHeight} - 24px)`}/>
              </Box>
            </Tooltip>
          </HeaderContentRight>
        </HeaderInnerWrap>
      </HeaderOuterWrap>
      <Dialog
        open={isLogoutModalOpen}
        title={commonTranslation('words.sign_out')}
        content={commonTranslation('sentences.are_you_sure_to_sign_out')}
        onClickBackdrop={handleClickLogoutNoButton}
      >
        <ButtonGroup>
          <Button
            fillVariant='filled'
            palette='error'
            isLoading={isLogoutOngoing}
            onClick={handleClickLogoutYesButton}
          >
            {commonTranslation('words.yes')}
          </Button>
          <Button
            fillVariant='filled'
            palette='default'
            onClick={handleClickLogoutNoButton}
          >
            {commonTranslation('words.no')}
          </Button>
        </ButtonGroup>
      </Dialog>
    </>
  );
}
