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
import HeaderLogo from './HeaderLogo';
import Icon from '@/components/graphic/Icon';

export const headerHeight = '60px';
export const headerSpacerHeight = '76px';

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
  margin: 16px auto;
`;

interface HeaderBackgroundColorProps {
  theme: Theme;
}
const HeaderBackgroundColor = styled.div<HeaderBackgroundColorProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.palette.default.base};
  opacity: 0.5;
`;

interface HeaderBackdropProps {
  theme: Theme;
}
const HeaderBackdrop = styled.div<HeaderBackdropProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.palette.default.low};
  border-radius: 8px;
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

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: ${headerHeight};
  margin: 0 8px;
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
  backButton?: boolean;
  currentUser?: User;
}
export default (props: Props) => {
  const {
    backButton = true,
    currentUser,
  } = props;
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { t: commonTranslation } = useTranslation('common');
  const [isSessionTooltipOpen, setSessionTooltipOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [isLogoutOngoing, setLogoutOngoing] = useState<boolean>(false);

  const handleClickBackButton = () => router.back();
  const handleClickHeaderLogo = () => {
    router.push('/');
  };
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
        <HeaderBackgroundColor theme={theme}/>
        <HeaderBackdrop theme={theme}/>
        <HeaderInnerWrap theme={theme}>
          <HeaderContentLeft>
            {backButton && (
              <ButtonGroup>
                {backButton && (
                  <Button
                    setPadding={false}
                    fillVariant='text'
                    onClick={handleClickBackButton}
                  >
                    <Icon type='fas' keyword='arrow-left' />
                  </Button>
                )}
              </ButtonGroup>
            )}
            <HeaderLogo
              onClick={handleClickHeaderLogo}
            />
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
