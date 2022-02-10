import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Card from '@/src/components/Card';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { IconTypeKeys } from '@/src/components/Icon';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  title?: string;
  subtitle?: string;
  icon?: {
    type?: IconTypeKeys;
    src?: string | IconProp;
  };
}

interface StyledComponentProps extends CommonStyledProps {}

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

const BriefCardCore = (props: ComponentProps) => <>
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

const BriefCard: React.FC<ComponentProps> = props => {
  if (props.onClick) return (
    <StyledButton variant='transparent' onClick={props.onClick}>
      {BriefCardCore(props)}
    </StyledButton>
  );
  else return BriefCardCore(props);
}

export default BriefCard;
