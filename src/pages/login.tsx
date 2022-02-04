import Container from '@/src/components/Container';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/Image';
import LoginButtonGroup from '@/src/components/LoginButtonGroup';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/PageOverview';
import Section from '@/src/components/Section';
import type { ThemeObject } from '@/src/styles/theme';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
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

const StyledPageOverviewImageWrap = styled(Image)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    width: 100%;
    max-height: 480px;
    max-width: 480px;
    margin: 0 auto;
    vertical-align: top;
  `}
`;

const StyledPageOverviewTextWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin-top: 24px;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  `}
`;

const StyledLoginButtonGroup = styled(LoginButtonGroup)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin-top: 24px;
  `}
`;

const Login: NextPage<PageProps> = ({ callbackUrl }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  return (
    <Container>
      <Section>
        <PageOverview
          firstChildren={<>
            <StyledPageOverviewImageWrap
              src='https://image.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg'
            />
            <StyledPageOverviewTextWrap>
              {t('_pleaseLogin')}
            </StyledPageOverviewTextWrap>
          </>}
          secondChildren={<>
            <StyledLoginButtonGroup
              callbackUrl={callbackUrl}
            />
          </>}
        />
      </Section>
    </Container>
  );
}

export default Login;
