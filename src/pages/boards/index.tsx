import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import Page from '@/components/page/Page';
import Text from '@/components/text/Text';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { getAllBoards } from '@/services/api/board';
import type { Board } from '@/services/api/board';

export const getServerSideProps = WithCheckUserServerSideProps(async (
  context: GetServerSidePropsContext,
  props: WithCheckUserServerSidePropsResponse,
) => {
  try {
    const getAllBoardsResponse = await getAllBoards({ context });
    return {
      props: {
        ...props,
        boardList: getAllBoardsResponse.data.boardList,
        eventBoardList: getAllBoardsResponse.data.eventBoardList,
      },
    };
  } catch(err) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
});

interface PageProps extends WithCheckUserServerSidePropsResponse {
  boardList: Board[];
  eventBoardList: Board[];
}
export default ({ currentUser, boardList, eventBoardList }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const { t: boardsTranslation } = useTranslation('boards');
  const router = useRouter();

  return (
    <Container currentUser={currentUser}>
      <Page setPadding>
        <Text variant='h2' align='center'>
          {boardsTranslation('words.boards')}
        </Text>
        {boardList.map((board: Board) => (
          <Text variant='p' align='center' key={board.id}>
            {boardsTranslation(board.i18nKey)}
          </Text>
        ))}
      </Page>
    </Container>
  );
};
