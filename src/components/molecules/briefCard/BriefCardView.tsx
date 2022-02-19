import Button from '@/components/atoms/button/Button';
import Card from '@/components/atoms/card/Card';
import type { CommonComponentProps } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import Icon from '@/components/molecules/icon/Icon';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  title?: string;
  subtitle?: string;
  icon?: IconObject;
}

const StyledButton = styled(Button)`
  ${(props: any) => `
    display: block;
    width: 100%;
    padding: 0;
  `}
`;

const StyledWrapCard = styled(Card)`
  ${(props: any) => `
    padding: 8px;
    &::after {
      clear: both;
      content: '';
      display: block;
    }
  `}
`;

const StyledIcon = styled(Icon)`
  ${(props: any) => `
    float: left;
    height: 28px;
    width: 28px;
    margin-right: 16px;
  `}
`;

const StyledTextDiv = styled(Div)`
  ${(props: any) => `
    overflow: hidden;
    margin: 2px 0;
    vertical-align: top;
  `}
`;

const StyledTitleDiv = styled(Div)`
  ${(props: any) => `
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
  `}
`;

const StyledSubtitleDiv = styled(Div)`
  ${(props: any) => `
    font-size: 16px;
    line-height: 20px;
    margin-top: 4px;
  `}
`;

const BriefCardCore = (props: ViewProps) => <>
  <StyledWrapCard
    className={props.className}
    css={props.css}
  >
    <StyledIcon
      type={props?.icon?.type}
      src={props?.icon?.src}
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
</>;

const BriefCardView: React.FC<ViewProps> = props => {
  if (props.onClick) return (
    <StyledButton
      variant='transparent'
      onClick={props.onClick}
    >
      {BriefCardCore(props)}
    </StyledButton>
  );
  else return BriefCardCore(props);
}

export default BriefCardView;
