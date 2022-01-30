import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Avatar from '@/src/components/Avatar';
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

export const height = '64px';

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

// Header가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDivDummy = styled.div`
  ${(props: any) => `
    height: ${height};
  `}
`;

const StyledHeaderWrap = styled.header<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${props.theme.palette.primary.main};
    color: ${props.theme.palette.primary.text};
    height: ${height};
    z-index: 20;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledLogoTextWrap = styled.span<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    color: ${props.theme.palette.primary.text};
    font-size: 24px;
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
    left: 10px;
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
    right: 10px;
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
    <>
      <StyledDivDummy />
      <StyledHeaderWrap>
        <WidthLimiter>
          <StyledLeftsideWrap>
            <Logo />
          </StyledLeftsideWrap>
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
    </>
  );
};

export default Header;
