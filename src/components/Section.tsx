import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

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

interface StyledProps extends CommonProps {
  enableMargin?: boolean;
  enablePadding?: boolean;
}

const StyledCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
    margin: ${props.enableMargin ? '8px' : '0'};
    padding: ${props.enablePadding ? '8px' : '0'};
  `}
`;

const StyledHeaderDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    padding: 8px;
  `}
`;

const StyledIcon = styled(Icon)<StyledProps>`
  ${(props: StyledProps) => `
    float: left;
    height: 28px;
    width: 28px;
    margin-right: 16px;
  `}
`;

const StyledTitleDiv = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
  `}
`;

const Section: NextPage<ComponentProps> = props => {
  return (
    <StyledCard
      variant={props.variant ?? 'outlined'}
      palette={props.palette ?? 'default'}
      enableMargin={props.enableMargin}
      enablePadding={props.enablePadding ?? true}
    >
      <StyledHeaderDiv>
        <StyledIcon type={props?.icon?.type} src={props?.icon?.src} />
        <StyledTitleDiv>{ props.title }</StyledTitleDiv>
      </StyledHeaderDiv>
      { props.children }
    </StyledCard>
  );
}

export default Section;
