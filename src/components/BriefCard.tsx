import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Card from '@/src/components/Card';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

interface StyledProps extends CommonProps {}

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

const StyledTitleDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    
  `}
`;

const StyledSubtitleDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    
  `}
`;

const BriefCard: NextPage<ComponentProps> = props => {
  return (
    <StyledWrapCard
      className={props.className}
      css={props.css}
    >
      <StyledIcon
        src={props.imageUrl}
      />
      <StyledTextDiv>
        <StyledTitleDiv>
          {props.title}
        </StyledTitleDiv>
        <StyledSubtitleDiv>
          {props.subtitle}
        </StyledSubtitleDiv>
      </StyledTextDiv>
      {props.children}
    </StyledWrapCard>
  );
}

export default BriefCard;
