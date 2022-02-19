import Button from '@/components/atoms/button/Button';
import type { CommonComponentProps } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import Icon from '@/components/molecules/icon/Icon';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// Header 컴포넌트에서 사용하기 위해 export함
export interface ComponentProps extends CommonComponentProps {
  active?: boolean;
  headerItem: HeaderItemObject;
}

interface DivWrapProps extends CommonComponentProps {}

interface IconProps extends CommonComponentProps {}

interface DivLabelWrapProps extends CommonComponentProps {}

const StyledButton = styled(Button)`
  ${(props: any) => `
    display: inline-block;
    height: 100%;
    width: 64px;
    padding: 0;
    text-align: center;
  `}
`;

const StyledDivWrap = styled(Div)<DivWrapProps>`
  ${(props: any) => `
    display: block;
    padding: 8px 0;
    ${props.css}
  `}
`;

const StyledIcon = styled(Icon)<IconProps>`
  ${(props: any) => `
    height: 28px;
    width: 28px;
    color: ${props.theme.palette.primary.text};
  `}
`;

const StyledDivLabelWrap = styled(Div)<DivLabelWrapProps>`
  ${(props: any) => `
    font-size: 12px;
    line-height: 12px;
    padding-top: 4px;

    color: ${props.theme.palette.primary.text};
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

const HeaderItemView: React.FC<ComponentProps> = props => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <StyledButton
      variant='transparent'
      onClick={() => router.push(props.headerItem.pathname)}
    >
      <StyledDivWrap
        css={props.css}
      >
        { props.headerItem.icon && 
          <StyledIcon
            src={props.headerItem.icon.src}
            type={props.headerItem.icon.type}
          />
        }
        <StyledDivLabelWrap>
          { t(props.headerItem.label) }
        </StyledDivLabelWrap>
      </StyledDivWrap>
    </StyledButton>
  );
}

export default HeaderItemView;
