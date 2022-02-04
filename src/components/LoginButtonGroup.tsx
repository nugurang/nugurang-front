import Button from '@/src/components/Button';
import Dialog from '@/src/components/Dialog';
import FontAwesomeIcon from '@/src/components/FontAwesomeIcon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
import { loginToSession } from '@/src/utils/session';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface LoginProviderItem {
  icon: IconProp;
  label: string;
  providerName: string;
}

const loginProviderItems: LoginProviderItem[] = [
  {
    icon: ['fab', 'github'],
    label: 'gitHub',
    providerName: 'github',
  },
  {
    icon: ['fab', 'google'],
    label: 'google',
    providerName: 'google',
  },
];

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {
  alt?: string;
  callbackUrl?: string;
  children?: React.ReactNode;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledWrap = styled.div<StyledWrapProps>`
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
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      display: block;
      width: 100%;
      max-width: none;
      margin-top: 10px;
      margin-left: 0;
      &:first-of-type {
        margin-top: 0;
      }
    }
  `}
`;

const StyledLoginButtonLabelSpan = styled.span<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    margin-top: 8px;
    & :first-of-type {
      margin-top: 0;
    }
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      display: inline-block;
      margin: 0 0 0 8px;
      vertical-align: top;
      line-height: 32px;
    }
  `}
`;

const LoginButtonGroup: NextPage<ComponentProps> = ({
  callbackUrl,
  className,
  css,
}) => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledWrap
        className={className}
        css={css}
      >
        {
          loginProviderItems.map((loginProviderItem, index) => {
            return <StyledLoginButton
              key={index}
              onClick={() => {
                setOpen(true);
                loginToSession({
                  providerName: loginProviderItem.providerName,
                  callbackUrl: callbackUrl ?? '/'
                });
              }}
            >
              <FontAwesomeIcon
                icon={loginProviderItem.icon}
                size='large'
              />
              <StyledLoginButtonLabelSpan>
                {t(loginProviderItem.label)}
              </StyledLoginButtonLabelSpan>
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
