import * as constants from '@/src/constants';

import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import Div from '@/src/components/base/Div';
import { GetServerSideProps } from 'next';
import Icon from '@/src/components/Icon';
import Img from '@/src/components/base/Img';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/PageOverview';
import Section from '@/src/components/Section';
import type { ThemeObject } from '@/src/styles/theme';
import WidthLimiter from '@/src/components/WidthLimiter';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { loginToNextAuth } from '@/src/utils/next-auth';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all', (context: any, props: any) => {
  const callbackUrl = context.query.callbackUrl;
  return {
    props: {
      ...props,
      callbackUrl
    }
  }
});

interface PageProps {
  currentUser: any,
  callbackUrl: string,
}

interface StyledWrapProps {
  theme: ThemeObject;
}

const StyledPageOverviewImgWrap = styled(Img)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledPageOverviewTextWrap = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin-top: 24px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  `}
`;

const StyledLoginButtonGroup = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin: 24px auto 0;
    text-align: center;
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

const StyledLoginButtonIcon = styled(Icon)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    height: 32px;
    width: 32px;
    color: ${props.theme.palette.default.text};
  `}
`;

const LoginIndex: NextPage<PageProps> = ({ callbackUrl }) => {
  const { t } = useTranslation('common');
  const [isPendingDialogOpen, setIsPendingDialogOpen] = useState(false);
  return (
    <>
      <WidthLimiter>
        <Section variant='transparent'>
          <PageOverview
            firstChildren={<>
              <StyledPageOverviewImgWrap
                src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
              />
              <StyledPageOverviewTextWrap>
                {t('_pleaseLogin')}
              </StyledPageOverviewTextWrap>
            </>}
            secondChildren={<>
              <StyledLoginButtonGroup>
                {
                  constants.OAUTH_PROVIDERS.map((provider, index) => {
                    return <StyledLoginButton
                      key={index}
                      onClick={() => {
                        setIsPendingDialogOpen(true);
                        loginToNextAuth({
                          providerName: provider.name,
                          callbackUrl: `/session/login/callback?callbackUrl=${callbackUrl ?? '/'}`
                        });
                      }}
                    >
                      <StyledLoginButtonIcon
                        src={provider.fontAwesomeIcon}
                        type='fontAwesomeIcon'
                      />
                      {t(provider.name)}
                    </StyledLoginButton>
                  })
                }
              </StyledLoginButtonGroup>
            </>}
          />
        </Section>
      </WidthLimiter>
      <Dialog
        open={isPendingDialogOpen}
        loader={true}
        title={t('login')}
      />
    </>
  );
}

export default WithCommonPreferences(LoginIndex);
