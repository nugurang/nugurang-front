import type { PaletteKeys, ThemeObject } from '@/src/styles/theme';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface CssProps {
  css?: string;
  palette?: PaletteKeys;
}

// NavigationBar 컴포넌트에서 사용하기 위해 export함
export interface ComponentProps extends CssProps {
  active?: boolean;
  pathname: string;
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

const StyledButton = styled(Button)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    height: 100%;
    width: 64px;
    padding: 0;
    text-align: center;
  `}
`;

const StyledDivWrap = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    color: ${props.active
      ? props.theme.palette.primary.main
      : props.theme.palette.background.subtext
    };
    padding: 8px 0;
    ${props.css}
  `}
`;

const StyledIcon = styled(Icon)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    height: 28px;
    width: 28px;
  `}
`;


const StyledDivLabelWrap = styled(Div)`
  ${(props: any) => `
    font-size: 12px;
    line-height: 12px;
    padding-top: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

const NavigationBarItem: NextPage<ComponentProps> = ({
  active,
  css,
  pathname,
  icon,
  label
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <StyledButton
      variant='transparent'
      onClick={() => router.push(pathname)}
    >
      <StyledDivWrap
        active={active}
        css={css}
      >
        { icon && 
          <StyledIcon
            src={icon}
            type='fontAwesomeIcon'
          />
        }
        <StyledDivLabelWrap>
          { t(label) }
        </StyledDivLabelWrap>
      </StyledDivWrap>
    </StyledButton>
  );
}

export default NavigationBarItem;
