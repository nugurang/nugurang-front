import Card from '@/src/components/Card';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/components/base/common';
import styled from '@emotion/styled';

interface CssProps {
  className?: string;
  css?: string;
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

const StyledWrapCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
  `}
`;

const StyledIcon = styled(Icon)<StyledProps>`
  ${(props: StyledProps) => `
    height: 72px;
    width: 72px;
    margin-right: 16px;
  `}
`;

const StyledTextDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    margin: 4px 0;
    vertical-align: top;
  `}
`;

const StyledNameDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    
  `}
`;

const StyledEmailDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    
  `}
`;

const BriefUserProfile: NextPage<ComponentProps> = ({
  className,
  css,
  imageUrl,
  name,
  email
}) => {
  return (
    <StyledWrapCard
      className={className}
      css={css}
    >
      <StyledIcon
        src={imageUrl}
      />
      <StyledTextDiv>
        <StyledNameDiv>
          {name}
        </StyledNameDiv>
        <StyledEmailDiv>
          {email}
        </StyledEmailDiv>
      </StyledTextDiv>
    </StyledWrapCard>
  );
}

export default BriefUserProfile;
