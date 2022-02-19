import * as constants from '@/constants';

import Button from '@/components/atoms/button/Button';
import Dialog from '@/components/molecules/dialog/Dialog';
import Div from '@/components/quarks/div/Div';
import Icon from '@/components/molecules/icon/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Image from '@/components/atoms/image/Image';
import PageOverview from '@/components/molecules/pageOverview/PageOverview';
import Section from '@/components/molecules/section/Section';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import { loginToNextAuth } from '@/utils/next-auth';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';

interface ViewProps {
  callbackUrl: string;
  loginState: any;
  updateLoginState: (value: any) => void;
}

const StyledPageOverviewImgWrap = styled(Image)`
  ${(props: any) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledPageOverviewTextWrap = styled(Div)`
  ${(props: any) => `
    margin-top: 24px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  `}
`;

const StyledLoginButtonGroup = styled(Div)`
  ${(props: any) => `
    margin: 24px auto 0;
    text-align: center;
  `}
`;

const StyledLoginButton = styled(Button)`
  ${(props: any) => `
    display: inline-block;
    margin: 0 10px 10px 0;
    width: calc(50% - 40px);
    max-width: 120px;
  `}
`;

const StyledLoginButtonIcon = styled(Icon)`
  ${(props: any) => `
    height: 32px;
    width: 32px;
    color: ${props.theme.palette.default.text};
  `}
`;

const LoginIndexView: React.FC<ViewProps> = props => {
  const { t } = useTranslation('common');
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
                        props.updateLoginState({
                          isDialogOpen: true
                        });
                        loginToNextAuth({
                          providerName: provider.name,
                          callbackUrl: `/session/login/callback?callbackUrl=${props.callbackUrl ?? '/'}`
                        });
                      }}
                    >
                      <StyledLoginButtonIcon
                        src={provider.icon.src as IconProp}
                        type={provider.icon.type}
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
        open={props.loginState.isDialogOpen}
        loader={true}
        title={t('_loggingIn')}
      />
    </>
  );
}

export default LoginIndexView;
