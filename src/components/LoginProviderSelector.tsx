import Button from '@/src/components/Button';
import FontAwesomeIcon from '@/src/components/FontAwesomeIcon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
import { getWindowLocation } from '@/src/utils/url';
import styled from 'styled-components';
import { useRouter } from 'next/router';
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

const StyledLoginProviderItemButton = styled(Button)<StyledWrapProps>`
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
      &:first-child {
        margin-top: 0;
      }
    }
  `}
`;

const StyledLoginProviderItemLabelSpan = styled.span<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    margin-top: 8px;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      display: inline-block;
      margin: 0 0 0 8px;
      vertical-align: top;
      line-height: 32px;
    }
  `}
`;

const LoginProviderSelector: NextPage<ComponentProps> = ({
  className,
  css,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <StyledWrap
      className={className}
      css={css}
    >
      {
        loginProviderItems.map((loginProviderItem, index) => {
          return <StyledLoginProviderItemButton
            key={index}
            onClick={() => router.push({
              pathname: '/session/login',
              query: {
                callbackUrl: getWindowLocation(),
                providerName: loginProviderItem.providerName,
              },
            })}
          >
            <FontAwesomeIcon
              icon={loginProviderItem.icon}
              size='large'
            />
            <StyledLoginProviderItemLabelSpan>
              {t(loginProviderItem.label)}
            </StyledLoginProviderItemLabelSpan>
          </StyledLoginProviderItemButton>
        })
      }
    </StyledWrap>
  );
}

export default LoginProviderSelector;
