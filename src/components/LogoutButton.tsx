import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import type { NextPage } from 'next';
import { logoutFromSession } from '@/src/utils/session';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface ComponentProps extends CommonProps {
  callbackUrl?: string;
}

interface StyledProps extends CommonProps {}

const StyledButton = styled(Button)<StyledProps>`
  ${(props: StyledProps) => `
    ${props.css || ''}
  `}
`;

const LogoutButton: NextPage<ComponentProps> = props => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  return (
    <>
      <StyledButton
        className={props.className}
        css={props.css}
        onClick={() => setOpen(true)}
        palette='danger'
      >
        {t('logout')}
      </StyledButton>
      <Dialog
        open={open}
        onClickBackdrop={(open && pending) ? undefined : () => setOpen(false)}
        loader={pending}
        title={pending ? t('logout') : t('_areYouSureLogout')}
        noLabel={t('logout')}
        onNo={(open && pending) ? undefined : () => {
          setPending(true);
          logoutFromSession({ callbackUrl: props.callbackUrl ?? '/' });
        }}
        onCancel={(open && pending) ? undefined : () => setOpen(false)}
      />
    </>
  );
}

export default LogoutButton;
