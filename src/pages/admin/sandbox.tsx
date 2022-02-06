import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import { GetServerSideProps } from 'next';
import Loader from '@/src/components/Loader';
import type { NextPage } from 'next';
import Section from '@/src/components/Section';
import WidthLimiter from '@/src/components/WidthLimiter';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentOAuth2User: Object,
  callbackUrl: string;
  currentUser: any;
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const Sandbox: NextPage<PageProps> = ({
  callbackUrl,
  currentUser,
  isDark,
  setIsDark,
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  return (
    <WidthLimiter>
      <Section>
        {t('_helloWorld')}
        <Button
          variant='filled'
          palette='primary'
          onClick={() => router.push('/admin/sandbox', '/admin/sandbox', { locale: router.locale === 'en' ? 'ko' : 'en' })}
        >
          {`change-locale`}
        </Button>
        <Button
          variant='filled'
          palette='primary'
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? 'Dark' : 'Light'}
        </Button>
        <Button
          onClick={() => setOpen(true)}
        >
          Toggle Modal
        </Button>
        <Loader />
        <Dialog
          open={open}
          onClickBackdrop={() => setOpen(false)}
          title={'테스트 제목입니다.'}
          content={'테스트 본문입니다.'}
          onYes={() => {}}
          onNo={() => {}}
        />
      </Section>
    </WidthLimiter>
  );
}

export default WithCommonPreferences(Sandbox);
