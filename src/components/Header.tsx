import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Avatar from '@/src/components/Avatar';
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

interface CssProps {
  user?: {
    name: string;
    imageUrl?: string;
  };
}

interface ComponentProps extends CssProps {}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledHeaderWrap = styled.header<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: relative;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
    height: 64px;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledLogoTextWrap = styled.span<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: ${props.theme.palette.primary.main};
    font-size: 24px;
    font-weight: bold;
  `}
`;

const StyledLeftsideWrap = styled.span`
  ${(props: any) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  `}
`;

const StyledRightsideWrap = styled.span`
  ${(props: any) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  `}
`;

const Logo: NextPage = () => {
  return (
    <StyledLogoTextWrap>nugurang</StyledLogoTextWrap>
  );
};

const Header: NextPage<ComponentProps> = ({ user }) => {
  const { t } = useTranslation('common');
  return (
    <StyledHeaderWrap>
      <WidthLimiter>
        <StyledLeftsideWrap>
        </StyledLeftsideWrap>
        <Logo />
        <StyledRightsideWrap>
          {
            user && (
              <Avatar alt={user.name}>
                <img alt=''></img>
              </Avatar>
            )
          }
          {
            !user && (
              <Link
                button
                href='/login'
                palette='primary'
              >
                { t('login') }
              </Link>
            )
          }
        </StyledRightsideWrap>
      </WidthLimiter>
    </StyledHeaderWrap>
  );
};

export default Header;
