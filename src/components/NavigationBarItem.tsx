import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// NavigationBar 컴포넌트에서 사용하기 위해 export함
export interface ComponentProps extends CommonProps {
  active?: boolean;
  pathname: string;
  fontAwesomeIcon?: IconProp;
  label: string;
}

interface StyledProps extends CommonProps {
  active?: boolean;
}

const StyledButton = styled(Button)<StyledProps>`
  ${(props: StyledProps) => `
    display: inline-block;
    height: 100%;
    width: 64px;
    padding: 0;
    text-align: center;
  `}
`;

const StyledDivWrap = styled(Div)<StyledProps>`
  ${(props: StyledProps) => `
    display: block;
    padding: 8px 0;
    ${props.css}
  `}
`;

const StyledIcon = styled(Icon)<StyledProps>`
  ${(props: StyledProps) => `
    height: 28px;
    width: 28px;
    color: ${props.active
      ? props.theme.palette.primary.main
      : props.theme.palette.background.subtext
    };
  `}
`;

const StyledDivLabelWrap = styled(Div)<StyledProps>`
  ${(props: any) => `
    font-size: 12px;
    line-height: 12px;
    padding-top: 4px;

    color: ${props.active
      ? props.theme.palette.primary.main
      : props.theme.palette.background.subtext
    };
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

const NavigationBarItem: NextPage<ComponentProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <StyledButton
      variant='transparent'
      onClick={() => router.push(props.pathname)}
    >
      <StyledDivWrap
        css={props.css}
      >
        { props.fontAwesomeIcon && 
          <StyledIcon
            src={props.fontAwesomeIcon}
            type='fontAwesomeIcon'
            active={props.active}
          />
        }
        <StyledDivLabelWrap
          active={props.active}
        >
          { t(props.label) }
        </StyledDivLabelWrap>
      </StyledDivWrap>
    </StyledButton>
  );
}

export default NavigationBarItem;
