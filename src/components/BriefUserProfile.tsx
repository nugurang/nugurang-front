import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Card from '@/src/components/Card';
import Div from '@/src/components/quarks/div/Div';
import Icon from '@/src/components/atoms/icon/Icon';
import styled from '@emotion/styled';

interface ComponentProps extends CommonComponentProps {
  name: string;
  email: string;
  imageUrl?: string;
}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapCard = styled(Card)`
  ${(props: any) => `
  `}
`;

const StyledIcon = styled(Icon)`
  ${(props: any) => `
    height: 72px;
    width: 72px;
    margin-right: 16px;
  `}
`;

const StyledTextDiv = styled(Div)`
  ${(props: any) => `
    display: inline-block;
    margin: 4px 0;
    vertical-align: top;
  `}
`;

const StyledNameDiv = styled(Div)`
  ${(props: any) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    
  `}
`;

const StyledEmailDiv = styled(Div)`
  ${(props: any) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    
  `}
`;

const BriefUserProfile: React.FC<ComponentProps> = props => {
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
