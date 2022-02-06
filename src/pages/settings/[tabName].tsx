import BriefCard from '@/src/components/BriefCard';
import BriefUserProfile from '@/src/components/BriefUserProfile';
import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import { GetServerSideProps } from 'next';
import Grid from '@/src/components/Grid';
import List from '@/src/components/List';
import ListItem from '@/src/components/ListItem';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/PageOverview';
import Section from '@/src/components/Section';
import type { TabItem } from '@/src/components/VerticalTab';
import VerticalTab from '@/src/components/VerticalTab';
import WidthLimiter from '@/src/components/WidthLimiter';
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

  console.log(selectedTabName);
  const tabItems = [
    {
      name: 'account',
      icon: {
        type: 'fontAwesomeIcon',
        src: ['fas', 'coffee']
      },
      title: 'Hello',
      subtitle: 'Hello',
      child: <>
        Hello World
      </>
    },
    {
      name: 'developer',
      icon: {
        type: 'fontAwesomeIcon',
        src: ['fas', 'code']
      },
      title: t('developerOption'),
      child: <>
        Hi there
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
          tabItems={tabItems}
          initialIndex={selectedTabName ? tabItems.findIndex(item => item.name == selectedTabName) : 0}
          initialDepth={selectedTabName ? 1 : 0}
        />
      </Section>
    </WidthLimiter>
  );
}

export default WithCommonPreferences(MyPageIndex);
