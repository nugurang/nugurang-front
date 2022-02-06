import * as constants from '@/src/constants';

import { mutateToBackend, queryToBackend } from '@/src/utils/backend';

import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import Section from '@/src/components/Section';
import VerticalTab from '@/src/components/VerticalTab';
import WidthLimiter from '@/src/components/WidthLimiter';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user');

interface PageProps {
  currentUser: any
}

interface CreateBoardProps {
  name: string;
}
const createBoard = async (props: CreateBoardProps) => {
  await mutateToBackend(null, `
    mutation CreateBoard($board: BoardInput!) {
      createBoard(board: $board) {
        id
        name
      }
    }
  `, {
    board: {
      name: props.name
    }
  });
};

const MyPageIndex: NextPage<PageProps> = ({ currentUser }) => {
  const router = useRouter();
  const { tabName: selectedTabName } = router.query;
  const { t } = useTranslation('common');

  const initialDialog = {
    open: false,
    title: '',
    content: '',
    pending: false,
  };
  const [dialog, setDialog] = useState(initialDialog);
  const clearDialog = () => {
    setDialog(initialDialog);
  }

  const onClickCreateBoardButton = async () => {
    setDialog(dialog => ({
      ...dialog,
      open: true,
      pending: true,
      loader: true,
      title: 'Creating boards...'
    }));
    for (const name of constants.COMMON_BOARD_NAMES) {
      setDialog(dialog => ({
        ...dialog,
        content: name
      }));
      await createBoard({
        name
      });
    };
    setDialog(dialog => ({
      ...dialog,
      pending: false,
      title: 'Creation complete.',
      content: ''
    }));
  };

  const tabItems = [
    {
      name: 'account',
      icon: {
        type: 'fontAwesomeIcon',
        src: ['fas', 'key']
      },
      title: t('account'),
      subtitle: t('account'),
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
        <Section
          title='Create boards'
        >
          <Button
            onClick={onClickCreateBoardButton}
          >
            Create Boards
          </Button>
        </Section>
      </>
    }
  ].map(tabItem => ({
    ...tabItem,
    onClickTitle: () => router.push(`/settings/${tabItem.name}`)
  }));

  return (
    <>
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
      <Dialog
        open={dialog.open}
        loader={dialog.pending}
        title={dialog.title}
        content={dialog.content}
        onYes={dialog.pending ? undefined : () => clearDialog()}
        yesLabel={t('ok')}
      />
    </>
  );
}

export default WithCommonPreferences(MyPageIndex);
