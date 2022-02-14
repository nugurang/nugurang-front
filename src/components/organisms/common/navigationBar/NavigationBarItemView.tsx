import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Button from '@/src/components/atoms/button/Button';
import Div from '@/src/components/quarks/div/Div';
import Icon from '@/src/components/molecules/icon/Icon';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// NavigationBar 컴포넌트에서 사용하기 위해 export함
export interface ComponentProps extends CommonComponentProps {
  selected?: boolean;
  navigationBarItem: NavigationBarItemObject;
}

interface StyledComponentProps extends CommonStyledProps {
  selected?: boolean;
}

const StyledButton = styled(Button)`
  ${(props: any) => `
    display: inline-block;
    height: 100%;
    width: 64px;
    padding: 0;
    text-align: center;
  `}
`;

const StyledDivWrap = styled(Div)<StyledComponentProps>`
  ${(props: any) => `
    display: block;
    padding: 8px 0;
    ${props.css}
  `}
`;

const StyledIcon = styled(Icon)<StyledComponentProps>`
  ${(props: any) => `
    height: 28px;
    width: 28px;
    color: ${props.selected
      ? props.theme.palette.primary.main
      : props.theme.palette.background.subtext
    };
  `}
`;

const StyledDivLabelWrap = styled(Div)<StyledComponentProps>`
  ${(props: any) => `
    font-size: 12px;
    line-height: 12px;
    padding-top: 4px;

    color: ${props.selected
      ? props.theme.palette.primary.main
      : props.theme.palette.background.subtext
    };
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

const NavigationBarItemView: React.FC<ComponentProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <StyledButton
      variant='transparent'
      onClick={() => router.push(props.navigationBarItem.pathname)}
    >
      <StyledDivWrap
        css={props.css}
      >
        { props.navigationBarItem.icon && 
          <StyledIcon
            src={props.navigationBarItem.icon.src}
            type={props.navigationBarItem.icon.type}
            selected={props.selected}
          />
        }
        <StyledDivLabelWrap
          selected={props.selected}
        >
          { t(props.navigationBarItem.label) }
        </StyledDivLabelWrap>
      </StyledDivWrap>
    </StyledButton>
  );
}

export default NavigationBarItemView;
