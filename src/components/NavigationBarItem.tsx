import FontAwesomeIcon from '@/src/components/FontAwesomeIcon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from '@/src/components/Link';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

export interface Props {
  active?: boolean;
  css?: string;
  href?: string;
  icon?: IconProp;
  label: string;
}

export interface StyledDivWrapProps {
  active: boolean;
  css: string;
}

const StyledDivWrap = styled.div<StyledDivWrapProps>`
  ${(props: any) => `
    color: ${props.active
      ? props.theme.palette.primary.main
      : props.theme.palette.background.smallText
    };
    padding: 5px 15px;
    text-align: center;
    ${props.css}
  `}
`;

const StyledLabelDivWrap = styled.div`
  ${(props: any) => `
    line-height: 12px;
  `}
`;

const NavigationBarItem: NextPage<Props> = ({
  active = false,
  css = '',
  href = '',
  icon,
  label
}) => {
  return (
    <Link href={href}>
      <StyledDivWrap active={active} css={css}>
        { icon && 
          <FontAwesomeIcon
            icon={icon}
            fontSize='36px'
          />
        }
        <StyledLabelDivWrap>
          { label }
        </StyledLabelDivWrap>
      </StyledDivWrap>
    </Link>
  );
}

export default NavigationBarItem;
