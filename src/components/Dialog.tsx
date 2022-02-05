import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import Loader from '@/src/components/Loader';
import Modal from '@/src/components/Modal';
import type { NextPage } from 'next';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

interface ComponentProps extends CommonProps {
  loader?: boolean;
  open?: boolean;
  onClickBackdrop: (() => void) | undefined;
  title?: string;
  content?: string;
  yesLabel?: string;
  noLabel?: string;
  cancelLabel?: string;
  onYes?: (() => void) | undefined;
  onNo?: (() => void) | undefined;
  onCancel?: (() => void) | undefined;
}

interface StyledProps extends CommonProps {
  loader?: boolean;
  open?: boolean;
  active?: boolean;
}

const StyledWidthLimiter = styled(WidthLimiter)<StyledProps>`
  ${(props: any) => `
    padding: 48px 0;
    text-align: center;
  `}
`;

const StyledInfoDiv = styled(Div)<StyledProps>`
  ${(props: any) => `
    margin-bottom: 32px;
  `}
`;

const StyledLoader = styled(Loader)<StyledProps>`
  ${(props: any) => `
    display: ${props.loader ? 'inline-block' : 'none'};
    margin-bottom: 32px;
  `}
`;

const StyledTextDiv = styled(Div)<StyledProps>`
  ${(props: any) => `
    display: block;
  `}
`;

const StyledTitleDiv = styled(Div)<StyledProps>`
  ${(props: any) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    margin-bottom: 16px;
  `}
`;

const StyledContentDiv = styled(Div)<StyledProps>`
  ${(props: any) => `
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 16px;
  `}
`;

const StyledButtonGroupDiv = styled(Div)<StyledProps>`
  ${(props: any) => `
    & > * {
      margin-left: 8px;
    }
    & :first-of-type {
      margin-left: 0;
    }
  `}
`;

const StyledButton = styled(Button)<StyledProps>`
  ${(props: any) => `
    display: ${ props.active ? 'inline' : 'none' };
  `}
`;

const Dialog: NextPage<ComponentProps> = props => {
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
            active={props.onYes}
            onClick={props.onYes}
          >
            {props.yesLabel || t('yes')}
          </StyledButton>
          <StyledButton
            palette='danger'
            active={props.onNo}
            onClick={props.onNo}
          >
            {props.noLabel || t('no')}
          </StyledButton>
          <StyledButton
            active={props.onCancel}
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
