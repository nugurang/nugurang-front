import type { PaletteKey, ThemeObject } from '@/src/styles/theme';
import { ellipsis, fontFamily } from '@/src/styles/preset';

import Icon from '@/src/components/Icon';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface CssProps {
  className?: string;
  css?: string;
  palette?: PaletteKey;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  name: string;
  email: string;
  imageUrl?: string;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const StyledWrap = styled.div<StyledProps>`
  ${(props: StyledProps) => `
  `}
`;

const StyledUserBriefProfileIcon = styled(Icon)<StyledProps>`
  ${(props: StyledProps) => `
    height: 72px;
    width: 72px;
    margin-right: 16px;
  `}
`;

const StyledUserBriefProfileTextGroupDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    margin: 4px 0;
    vertical-align: top;
  `}
`;

const StyledUserBriefProfileNameDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    ${ellipsis}
    ${fontFamily}
  `}
`;

const StyledUserBriefProfileEmailDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    ${ellipsis}
    ${fontFamily}
  `}
`;

const BriefUserProfile: NextPage<ComponentProps> = ({
  className,
  css,
  palette,
  name,
  email,
  imageUrl
}) => {
  return (
    <StyledWrap
      className={className}
      css={css}
      palette={palette}
    >
      <StyledUserBriefProfileIcon
        src={imageUrl}
      />
      <StyledUserBriefProfileTextGroupDiv>
        <StyledUserBriefProfileNameDiv>
          {name}
        </StyledUserBriefProfileNameDiv>
        <StyledUserBriefProfileEmailDiv>
          {email}
        </StyledUserBriefProfileEmailDiv>
      </StyledUserBriefProfileTextGroupDiv>
    </StyledWrap>
  );
}

export default BriefUserProfile;
