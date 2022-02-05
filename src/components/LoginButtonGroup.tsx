import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import Div from '@/src/components/base/Div';
import Icon from '@/src/components/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import React from 'react';
import { loginToSession } from '@/src/utils/session';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface LoginProviderItem {
  src: IconProp;
  label: string;
  providerName: string;
}

const loginProviderItems: LoginProviderItem[] = [
  {
    src: ['fab', 'github'],
    label: 'gitHub',
    providerName: 'github',
  },
  {
    src: ['fab', 'google'],
    label: 'google',
    providerName: 'google',
  },
];

interface ComponentProps extends CommonProps {
  alt?: string;
  callbackUrl?: string;
}

interface StyledWrapProps extends CommonProps {}

const StyledWrap = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    text-align: center;
    ${props.css || ''}
  `}
`;

const StyledLoginButton = styled(Button)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    margin: 0 10px 10px 0;
    width: calc(50% - 40px);
    max-width: 120px;
  `}
`;

const StyledIcon = styled(Icon)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    height: 32px;
    width: 32px;
  `}
`;

const LoginButtonGroup: NextPage<ComponentProps> = props => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledWrap
        className={props.className}
        css={props.css}
      >
        {
          loginProviderItems.map((loginProviderItem, index) => {
            return <StyledLoginButton
              key={index}
              onClick={() => {
                setOpen(true);
                loginToSession({
                  providerName: loginProviderItem.providerName,
                  callbackUrl: props.callbackUrl ?? '/'
                });
              }}
            >
              <StyledIcon
                src={loginProviderItem.src}
                type='fontAwesomeIcon'
              />
              {t(loginProviderItem.label)}
            </StyledLoginButton>
          })
        }
      </StyledWrap>
      <Dialog
        open={open}
        loader={true}
        title={t('login')}
      />
    </>
  );
}

export default LoginButtonGroup;
