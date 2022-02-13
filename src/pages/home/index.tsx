import Card from '@/src/components/atoms/card/Card';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import Section from '@/src/components/molecules/section/Section';
import WidthLimiter from '@/src/components/atoms/widthLimiter/WidthLimiter';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all');

interface PageProps {
  currentUser: any,
  callbackUrl: string,
}

const HomeIndex: NextPage<PageProps> = ({ currentUser, callbackUrl }) => {
  const { t } = useTranslation('common');
  return (
    <WidthLimiter>
      <Section>
        {t('_helloWorld')}
      </Section>
    </WidthLimiter>
  );
}

export default WithCommonPreferences(HomeIndex);
