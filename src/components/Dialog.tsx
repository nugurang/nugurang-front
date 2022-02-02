import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Button from '@/src/components/Button';
import Modal from '@/src/components/Modal';
import type { NextPage } from 'next';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

interface CssProps {
  css?: string;
  open: boolean;
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

const StyledButtonGroup = styled.div<StyledWrapProps>`
  ${(props: any) => `
    margin: 0 auto;
  `}
`;

const StyledButton = styled(Button)<StyledWrapProps>`
  ${(props: any) => `
    display: ${ props.active ? 'block' : 'none' };
    width: 100%;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      display: ${ props.active ? 'inline' : 'none' };
      width: initial;
    }
  `}
`;

const Dialog: NextPage<ComponentProps> = ({
  className,
  open,
  setOpen,
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
      setOpen={() => setOpen(!open)}
    >
      <StyledWidthLimiter>
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
