import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import Loader from '@/src/components/Loader';
import Modal from '@/src/components/Modal';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

interface ComponentProps extends CommonProps {
  loader?: boolean;
  open: boolean;
  onClickBackdrop?: () => void;
  title?: string;
  content?: string;
  yesLabel?: string;
  noLabel?: string;
  cancelLabel?: string;
  onYes?: (() => void) | undefined;
  onNo?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
}
export interface DialogProps extends ComponentProps {}

interface StyledComponentProps extends CommonStyledProps {
  loader?: boolean;
  active?: boolean;
}

const StyledWidthLimiter = styled(WidthLimiter)`
  ${(props: any) => `
    padding: 48px 0;
    text-align: center;
  `}
`;

const StyledInfoDiv = styled(Div)`
  ${(props: any) => `
    margin-bottom: 32px;
  `}
`;

const StyledLoader = styled(Loader)<StyledComponentProps>`
  ${(props: any) => `
    display: ${props.loader ? 'inline-block' : 'none'};
    margin-bottom: 32px;
  `}
`;

const StyledTextDiv = styled(Div)`
  ${(props: any) => `
    display: block;
  `}
`;

const StyledTitleDiv = styled(Div)`
  ${(props: any) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    margin-bottom: 16px;
  `}
`;

const StyledContentDiv = styled(Div)`
  ${(props: any) => `
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 16px;
  `}
`;

const StyledButtonGroupDiv = styled(Div)`
  ${(props: any) => `
    & > * {
      margin-left: 8px;
    }
    & :first-of-type {
      margin-left: 0;
    }
  `}
`;

const StyledButton = styled(Button)<StyledComponentProps>`
  ${(props: any) => `
    display: ${ props.active ? 'inline' : 'none' };
  `}
`;

const Dialog: React.FC<ComponentProps> = props => {
  const { t } = useTranslation('common');
  return (
    <Modal
      className={props.className}
      open={props.open}
      palette={props.palette}
      onClickBackdrop={props.onClickBackdrop}
    >
      <StyledWidthLimiter>
        <StyledInfoDiv>
          <StyledLoader loader={props.loader}/>
          <StyledTextDiv>
            <StyledTitleDiv>
              {props.title}
            </StyledTitleDiv>
            <StyledContentDiv>
              {props.content}
            </StyledContentDiv>
          </StyledTextDiv>
        </StyledInfoDiv>
        <StyledButtonGroupDiv>
          <StyledButton
            active={!!props.onYes}
            onClick={props.onYes}
          >
            {props.yesLabel || t('yes')}
          </StyledButton>
          <StyledButton
            palette='danger'
            active={!!props.onNo}
            onClick={props.onNo}
          >
            {props.noLabel || t('no')}
          </StyledButton>
          <StyledButton
            active={!!props.onCancel}
            onClick={props.onCancel}
          >
            {props.cancelLabel || t('cancel')}
          </StyledButton>
        </StyledButtonGroupDiv>
      </StyledWidthLimiter>
    </Modal>
  );
}

export default Dialog;
