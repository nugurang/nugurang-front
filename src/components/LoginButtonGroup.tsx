import type { CommonProps, ThemeObject } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import { loginToNextAuth } from '@/src/utils/next-auth';
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
                loginToNextAuth({
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
    </>
  );
}

export default LoginButtonGroup;
