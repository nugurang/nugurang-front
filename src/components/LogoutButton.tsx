import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Button from '@/src/components/Button';
import Dialog from '@/src/components/Dialog';
import type { NextPage } from 'next';
import { logout } from '@/src/utils/session';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {
  callbackUrl?: string;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledButton = styled(Button)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    ${props.css || ''}
  `}
`;

const LogoutButton: NextPage<ComponentProps> = ({
  callbackUrl,
  className,
  css,
}) => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  return (
    <>
      <StyledButton
        className={className}
        css={css}
        onClick={() => setOpen(true)}
        palette='danger'
      >
        {t('logout')}
      </StyledButton>
      <Dialog
        acrylic={true}
        open={open}
        onClickBackdrop={(open && pending) ? undefined : () => setOpen(false)}
        loader={pending}
        title={pending ? t('logout') : t('_areYouSureLogout')}
        noLabel={t('logout')}
        onNo={(open && pending) ? undefined : () => {
          setPending(true);
          logout(callbackUrl ?? '/');
        }}
        onCancel={(open && pending) ? undefined : () => setOpen(false)}
      />
    </>
  );
}

export default LogoutButton;
