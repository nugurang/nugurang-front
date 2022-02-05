import type { PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Div from '@/src/components/base/Div';
import Loader from '@/src/components/Loader';
import Modal from '@/src/components/Modal';
import type { NextPage } from 'next';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

interface CssProps {
  className?: string;
  loader?: boolean;
  open?: boolean;
  palette?: PaletteKeys;
}

interface ComponentProps extends CssProps {
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

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledWidthLimiter = styled(WidthLimiter)<StyledWrapProps>`
  ${(props: any) => `
    padding: 48px 0;
    text-align: center;
  `}
`;

const StyledInfoDiv = styled(Div)<StyledWrapProps>`
  ${(props: any) => `
    margin-bottom: 32px;
  `}
`;

const StyledLoader = styled(Loader)<StyledWrapProps>`
  ${(props: any) => `
    display: ${props.loader ? 'inline-block' : 'none'};
    margin-bottom: 32px;
  `}
`;

const StyledTextDiv = styled(Div)<StyledWrapProps>`
  ${(props: any) => `
    display: block;
  `}
`;

const StyledTitleDiv = styled(Div)<StyledWrapProps>`
  ${(props: any) => `
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    margin-bottom: 16px;
  `}
`;

const StyledContentDiv = styled(Div)<StyledWrapProps>`
  ${(props: any) => `
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 16px;
  `}
`;

const StyledButtonGroup = styled(Div)<StyledWrapProps>`
  ${(props: any) => `
    & > * {
      margin-left: 8px;
    }
    & :first-of-type {
      margin-left: 0;
    }
  `}
`;

const StyledButton = styled(Button)<StyledWrapProps>`
  ${(props: any) => `
    display: ${ props.active ? 'inline' : 'none' };
  `}
`;

const Dialog: NextPage<ComponentProps> = ({
  className,
  open,
  onClickBackdrop,
  palette,
  loader,
  title,
  content,
  yesLabel,
  noLabel,
  cancelLabel,
  onYes,
  onNo,
  onCancel
}) => {
  const { t } = useTranslation('common');
  return (
    <Modal
      className={className}
      open={open}
      palette={palette}
      onClickBackdrop={onClickBackdrop}
    >
      <StyledWidthLimiter>
        <StyledInfoDiv>
          <StyledLoader loader={loader}/>
          <StyledTextDiv>
            <StyledTitleDiv>
              {title}
            </StyledTitleDiv>
            <StyledContentDiv>
              {content}
            </StyledContentDiv>
          </StyledTextDiv>
        </StyledInfoDiv>
        <StyledButtonGroup>
          <StyledButton
            active={onYes}
            onClick={onYes}
          >
            {yesLabel || t('yes')}
          </StyledButton>
          <StyledButton
            palette='danger'
            active={onNo}
            onClick={onNo}
          >
            {noLabel || t('no')}
          </StyledButton>
          <StyledButton
            active={onCancel}
            onClick={onCancel}
          >
            {cancelLabel || t('cancel')}
          </StyledButton>
        </StyledButtonGroup>
      </StyledWidthLimiter>
    </Modal>
  );
}

export default Dialog;
