import Avatar from '@/src/components/Avatar';
import { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

const StyledHeaderWrap = styled.header`
  ${(props: any) => `
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
    height: 64px;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledLogoTextWrap = styled.span`
  ${(props: any) => `
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

const Header: NextPage = () => {
  return (
    <StyledHeaderWrap>
      <WidthLimiter>
        <StyledLeftsideWrap>
        </StyledLeftsideWrap>
        <Logo />
        <StyledRightsideWrap>
          <Avatar alt='as'>
          </Avatar>
        </StyledRightsideWrap>
      </WidthLimiter>
    </StyledHeaderWrap>
  );
};

export default Header;
