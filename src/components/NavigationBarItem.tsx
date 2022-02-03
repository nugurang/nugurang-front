import type { PaletteKey, ThemeObject } from '@/src/styles/theme';
import { ellipsis, fontFamily } from '@/src/styles/preset';

import FontAwesomeIcon from '@/src/components/FontAwesomeIcon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import type { UrlObject } from 'url';
import styled from '@emotion/styled';
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
    height: 100%;
    padding: 0;
    width: 72px;
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
    padding: 8px 12px;
    ${props.css}
  `}
`;

const StyledDivLabelWrap = styled.div`
  ${(props: any) => `
    font-size: 10px;
    line-height: 14px;
    margin: 4px 0;
    ${ellipsis}
    ${fontFamily}
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
