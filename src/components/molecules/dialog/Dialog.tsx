import type { CommonComponentProps } from '@/src/components/common';
import DialogView from '@/src/components/molecules/dialog/DialogView';
import { useTranslation } from 'next-i18next';

interface ComponentProps extends CommonComponentProps {
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
export interface DialogProps extends ComponentProps {}

const Dialog: React.FC<ComponentProps> = props => {
  const viewProps = {
    ...props
  };

  return (
    <DialogView {...viewProps} />
  );
}

export default Dialog;
