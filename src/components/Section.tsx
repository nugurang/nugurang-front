import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Card from '@/src/components/Card';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { IconTypeKeys } from '@/src/components/Icon';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  title?: string;
  icon?: {
    type?: IconTypeKeys;
    src?: string | IconProp;
  };
  enableMargin?: boolean;
  enablePadding?: boolean;
}

interface StyledCardProps extends CommonStyledProps {
  enableMargin?: boolean;
}

interface StyledChildrenWrapDivProps extends CommonStyledProps {
  enablePadding?: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>`
  ${(props: any) => `
    margin: ${props.enableMargin ? '8px' : '0'};
  `}
`;

const StyledHeaderDiv = styled(Div)`
  ${(props: any) => `
    padding: 16px;
    border-bottom: 1px solid ${props.theme.palette.default.high};
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

const StyledTitleDiv = styled(Div)`
  ${(props: any) => `
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
  `}
`;

const StyledChildrenWrapDiv = styled(Div)<StyledChildrenWrapDivProps>`
  ${(props: any) => `
    padding: ${props.enablePadding ? '16px' : '0'};
  `}
`;

const Section: React.FC<ComponentProps> = props => {
  return (
    <StyledCard
      variant={props.variant ?? 'outlined'}
      palette={props.palette ?? 'default'}
      enableMargin={props.enableMargin}
    >
      {
        (props.icon || props.title) && <>
          <StyledHeaderDiv>
            <StyledIcon type={props?.icon?.type} src={props?.icon?.src} />
            <StyledTitleDiv>{ props.title }</StyledTitleDiv>
          </StyledHeaderDiv>
        </>
      }
      <StyledChildrenWrapDiv
        enablePadding={props.enablePadding ?? true}
      >
        { props.children }
      </StyledChildrenWrapDiv>
    </StyledCard>
  );
}

export default Section;
