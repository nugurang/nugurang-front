import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Button from '@/src/components/Button';
import Dialog from '@/src/components/Dialog';
import type { NextPage } from 'next';
import { getWindowLocation } from '@/src/utils/url';
import { logout } from '@/src/utils/session';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledButton = styled(Button)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    ${props.css || ''}
  `}
`;

const LogoutButton: NextPage<ComponentProps> = ({
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
        setOpen={setOpen}
        loader={pending}
        title={pending ? t('logout') : t('_areYouSureLogout')}
        onYes={(open && pending) ? undefined : () => {
          setPending(true);
          logout(getWindowLocation());
        }}
        onNo={(open && pending) ? undefined : () => setOpen(false)}
      />
    </>
  );
}

export default LogoutButton;
