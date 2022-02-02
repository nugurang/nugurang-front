import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import Dialog from '@/src/components/Dialog';
import { GetServerSideProps } from 'next';
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentOAuth2User: Object,
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
}

const Sandbox: NextPage<PageProps> = ({ currentOAuth2User, isDark, setIsDark }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Card>
        {t('_helloWorld')}
        <Link
          href='/'
          locale={router.locale === 'en' ? 'ko' : 'en'}
          button={true}
        >
          {`change-locale`}
        </Link>
        <Button
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? 'Dark' : 'Light'}
        </Button>
        <Button
          onClick={() => setOpen(!open)}
        >
          Toggle Modal
        </Button>
        <Dialog
          open={open}
          setOpen={setOpen}
          title={'테스트 제목입니다.'}
          content={'테스트 본문입니다.'}
          onYes={() => {}}
          onNo={() => {}}
        >
            Hello
        </Dialog>
      </Card>
    </Container>
  );
}

export default Sandbox;
