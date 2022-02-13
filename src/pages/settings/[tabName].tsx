import { GetServerSideProps } from 'next';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import InitializeDatabase from '@/src/components/organisms/settings/InitializeDatabase';
import type { NextPage } from 'next';
import Section from '@/src/components/molecules/section/Section';
import TestComponents from '@/src/components/organisms/settings/TestComponents';
import UpdateUserBasicInfo from '@/src/components/organisms/settings/UpdateUserBasicInfo';
import VerticalTab from '@/src/components/molecules/verticalTab/VerticalTab';
import WidthLimiter from '@/src/components/atoms/widthLimiter/WidthLimiter';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user');

interface PageProps {
  currentUser: any
}

const MyPageIndex: NextPage<PageProps> = ({ currentUser }) => {
  const router = useRouter();
  const { tabName: selectedTabName } = router.query;
  const { t } = useTranslation('common');

  const items = [
    {
      name: 'account',
      icon: {
        type: 'fontAwesomeIcon' as IconTypeKeys,
        src: ['fas', 'key'] as IconProp
      },
      title: t('account'),
      subtitle: t('account'),
      child: <>
        <UpdateUserBasicInfo />
      </>
    },
    {
      name: 'developer',
      icon: {
        type: 'fontAwesomeIcon' as IconTypeKeys,
        src: ['fas', 'code'] as IconProp
      },
      title: t('developerOption'),
      child: <>
        <InitializeDatabase />
        <TestComponents />
      </>
    }
  ].map(tabItem => ({
    ...tabItem,
    onClickTitle: () => router.push(`/settings/${tabItem.name}`)
  }));

  return (
    <WidthLimiter>
      <Section
        variant='transparent'
      >
        <VerticalTab
          key={new Date().toISOString()} // 유일한 키를 부여하여 DOM을 리렌더링함
          items={items}
          initialIndex={selectedTabName ? items.findIndex(item => item.name == selectedTabName) : 0}
          initialDepth={selectedTabName ? 1 : 0}
        />
      </Section>
    </WidthLimiter>
  );
}

export default WithCommonPreferences(MyPageIndex);
