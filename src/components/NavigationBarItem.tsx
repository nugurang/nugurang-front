import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import FontAwesomeIcon from '@/src/components/FontAwesomeIcon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import React from 'react';
import type { UrlObject } from 'url';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

interface CssProps {
  css?: string;
  palette?: PaletteKey;
}

// NavigationBar 컴포넌트에서 사용하기 위해 export함
export interface ComponentProps extends CssProps {
  active?: boolean;
  href: string | UrlObject;
  icon?: IconProp;
  label: string;
}

interface StyledWrapProps extends CssProps {
  active?: boolean;
  theme: ThemeObject;
}

interface StyledWrapProps extends CssProps {
  active?: boolean;
  theme: ThemeObject;
}

const StyledLinkWrap = styled(Link)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    position: relative;
    height: 100%;
    text-align: center;
  `}
`;

const StyledDivWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    color: ${props.active
      ? props.theme.palette.primary.main
      : props.theme.palette.background.subtext
    };
    height: 100%;
    padding: 10px 15px;
    cursor: pointer;
    ${props.css}
  `}
`;

const StyledDivLabelWrap = styled.div`
  ${(props: any) => `
    font-size: 10px;
    line-height: 14px;
    margin: 4px 0;
  `}
`;

const NavigationBarItem: NextPage<ComponentProps> = ({
  active,
  css,
  href,
  icon,
  label
}) => {
  const { t } = useTranslation('common');
  return (
    <StyledLinkWrap
      href={href}
      passHref
    >
      <StyledDivWrap
        active={active}
        css={css}
      >
        { icon && 
          <FontAwesomeIcon
            icon={icon}
          />
        }
        <StyledDivLabelWrap>
          { t(label) }
        </StyledDivLabelWrap>
      </StyledDivWrap>
    </StyledLinkWrap>
  );
}

export default NavigationBarItem;
