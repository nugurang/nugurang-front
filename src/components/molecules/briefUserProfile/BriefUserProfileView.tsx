import Card from '@/components/atoms/card/Card';
import type { CommonComponentProps } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import Icon from '@/components/molecules/icon/Icon';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  name: string;
  email: string;
  imageUrl?: string;
}

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
    margin: 4px 0;
    vertical-align: top;
  `}
`;

const StyledNameDiv = styled(Div)`
  ${(props: any) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
    word-break: break-all;
  `}
`;

const StyledEmailDiv = styled(Div)`
  ${(props: any) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
    word-break: break-all;
  `}
`;

const BriefUserProfileView: React.FC<ViewProps> = props => {
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

export default BriefUserProfileView;
