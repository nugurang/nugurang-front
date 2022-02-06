import * as constants from '@/src/constants';

import { mutateToBackend, queryToBackend } from '@/src/utils/backend';

import Button from '@/src/components/base/Button';
import Dialog from '@/src/components/Dialog';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/base/Image';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/PageOverview';
import Section from '@/src/components/Section';
import WidthLimiter from '@/src/components/WidthLimiter';
import WithCommonPreferences from '@/src/components/WithCommonPreferences';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('user');

interface PageProps {
  currentOAuth2User: Object,
  isDark: boolean;
  setIsDark: (isDark: boolean) => {};
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

interface PageProps {
  callbackUrl: string,
  currentUser: any
}

const Console: NextPage<PageProps> = ({
  callbackUrl,
  currentUser
}) => {
  const router = useRouter();
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

  return (
    <WidthLimiter>
      <Section>
        <PageOverview
          firstChildren={<>
            <Image
              src='https://image.freepik.com/free-vector/visual-data-concept-illustration_114360-1713.jpg?'
            />
          </>}
          secondChildren={<>
            Console
          </>}
        />
        <Button
          onClick={onClickCreateBoardButton}
        >
          Create Boards
        </Button>
      </Section>
      <Dialog
        open={dialog.open}
        loader={dialog.pending}
        title={dialog.title}
        content={dialog.content}
        onYes={dialog.pending ? undefined : () => clearDialog()}
        yesLabel={t('ok')}
      />
    </WidthLimiter>
  );
}

export default WithCommonPreferences(Console);
