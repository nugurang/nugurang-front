import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Card from '@/src/components/Card';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  name: string;
  email: string;
  imageUrl?: string;
}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapCard = styled(Card)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
  `}
`;

const StyledIcon = styled(Icon)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    height: 72px;
    width: 72px;
    margin-right: 16px;
  `}
`;

const StyledTextDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    display: inline-block;
    margin: 4px 0;
    vertical-align: top;
  `}
`;

const StyledNameDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    
  `}
`;

const StyledEmailDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    
  `}
`;

const BriefUserProfile: NextPage<ComponentProps> = props => {
  return (
    <StyledWrapCard
      className={props.className}
      css={props.css}
    >
      <StyledIcon
        src={props.imageUrl}
      />
      <StyledTextDiv>
        <StyledNameDiv>
          {props.name}
        </StyledNameDiv>
        <StyledEmailDiv>
          {props.email}
        </StyledEmailDiv>
      </StyledTextDiv>
    </StyledWrapCard>
  );
}

export default BriefUserProfile;
