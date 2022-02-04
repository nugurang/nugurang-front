import * as constants from '@/src/constants';

import { mutateToBackend, queryToBackend } from '@/src/utils/backend';

import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Container from '@/src/components/Container';
import Dialog from '@/src/components/Dialog';
import { GetServerSideProps } from 'next';
import Image from '@/src/components/Image';
import type { NextPage } from 'next';
import PageOverview from '@/src/components/PageOverview';
import Section from '@/src/components/Section';
import styled from '@emotion/styled';
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

const StyledBannerGridDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`;

const StyledBannerGridItemCard = styled(Card)<StyledProps>`
  ${(props: StyledProps) => `
    margin: auto 0;
  `}
`;

const Console: NextPage<PageProps> = ({ currentOAuth2User }) => {
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
    <Container>
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
    </Container>
  );
}

export default Console;
