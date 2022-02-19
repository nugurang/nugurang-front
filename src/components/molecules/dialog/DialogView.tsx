import Button from '@/components/atoms/button/Button';
import type { CommonComponentProps } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import Loader from '@/components/atoms/loader/Loader';
import Modal from '@/components/molecules/modal/Modal';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

interface ViewProps extends CommonComponentProps {
  loader?: boolean;
  open: boolean;
  onClickBackdrop?: (() => void) | undefined;
  title?: string;
  content?: string;
  yesLabel?: string;
  noLabel?: string;
  cancelLabel?: string;
  onYes?: (() => void) | undefined;
  onNo?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
}

interface DialogProps {
  loader?: boolean;
}

interface ButtonProps {
  enable?: boolean;
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

const StyledLoader = styled(Loader)<DialogProps>`
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

const StyledButton = styled(Button)<ButtonProps>`
  ${(props: any) => `
    display: ${ props.enable ? 'inline' : 'none' };
  `}
`;

const DialogView: React.FC<ViewProps> = props => {
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
            enable={!!props.onYes}
            onClick={props.onYes}
          >
            {props.yesLabel || t('yes')}
          </StyledButton>
          <StyledButton
            palette='danger'
            enable={!!props.onNo}
            onClick={props.onNo}
          >
            {props.noLabel || t('no')}
          </StyledButton>
          <StyledButton
            enable={!!props.onCancel}
            onClick={props.onCancel}
          >
            {props.cancelLabel || t('cancel')}
          </StyledButton>
        </StyledButtonGroupDiv>
      </StyledWidthLimiter>
    </Modal>
  );
}

export default DialogView;
