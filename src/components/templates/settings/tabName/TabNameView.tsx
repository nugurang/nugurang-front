import InitializeDatabase from '@/components/organisms/settings/InitializeDatabase';
import Section from '@/components/molecules/section/Section';
import TestComponents from '@/components/organisms/settings/TestComponents';
import UpdateUserBasicInfo from '@/components/organisms/settings/UpdateUserBasicInfo';
import VerticalTab from '@/components/molecules/verticalTab/VerticalTab';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface ViewProps {
  currentUser: any
  selectedTabName: string;
}

const TabNameView: React.FC<ViewProps> = props => {
  const router = useRouter();
  const { tabName: selectedTabName } = router.query;
  const { t } = useTranslation('common');

  const items = [
    {
      name: 'account',
      icon: {
        type: 'fontAwesomeIcon' as IconTypeKeys,
        src: ['fas', 'key']
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
        src: ['fas', 'code']
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

export default TabNameView;
