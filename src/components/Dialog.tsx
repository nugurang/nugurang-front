import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Button from '@/src/components/Button';
import Modal from '@/src/components/Modal';
import type { NextPage } from 'next';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

interface CssProps {
  acrylic?: boolean;
  open: boolean;
  palette?: PaletteKey;
}

interface ComponentProps extends CssProps {
  className?: string;
  setOpen: (open: boolean) => void;
  title?: string;
  content?: string;
  yesLabel?: string;
  noLabel?: string;
  cancelLabel?: string;
  onYes?: () => void;
  onNo?: () => void;
  onCancel?: () => void;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledWidthLimiter = styled(WidthLimiter)<StyledWrapProps>`
  ${(props: any) => `
    padding: 24px 0;
    text-align: center;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      padding: 48px 0;
    }
  `}
`;

const StyledTextDiv = styled.div<StyledWrapProps>`
  ${(props: any) => `
    margin-bottom: 32px;
  `}
`;

const StyledTitleDiv = styled.div<StyledWrapProps>`
  ${(props: any) => `
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 16px;
  `}
`;

const StyledContentDiv = styled.div<StyledWrapProps>`
  ${(props: any) => `
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 16px;
  `}
`;

const StyledButtonGroup = styled.div<StyledWrapProps>`
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
  acrylic,
  className,
  open,
  setOpen,
  palette,
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
      acrylic={acrylic}
      className={className}
      open={open}
      palette={palette}
      setOpen={() => setOpen(!open)}
    >
      <StyledWidthLimiter>
        <StyledTextDiv>
          <StyledTitleDiv>
            {title}
          </StyledTitleDiv>
          <StyledContentDiv>
            {content}
          </StyledContentDiv>
        </StyledTextDiv>
        <StyledButtonGroup>
          <StyledButton
            active={onYes}
          >
            {yesLabel || t('yes')}
          </StyledButton>
          <StyledButton
            palette='danger'
            active={onNo}
          >
            {noLabel || t('no')}
          </StyledButton>
          <StyledButton
            active={onCancel}
          >
            {cancelLabel || t('cancel')}
          </StyledButton>
        </StyledButtonGroup>
      </StyledWidthLimiter>
    </Modal>
  );
}

export default Dialog;
