import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import Page from '@/compositions/page/Page';
import Text from '@/components/text/Text';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import type { Board } from '@/services/api/board';
import { getAllThreadsByBoardId, Thread } from '@/services/api/thread';
import InvalidQueryParamsError from '@/errors/common/InvalidQueryParamsError';

export const getServerSideProps = WithCheckUserServerSideProps(async (
  context: GetServerSidePropsContext,
  props: WithCheckUserServerSidePropsResponse,
) => {
  try {
    const { boardId } = context.query;
    if(!boardId) throw new InvalidQueryParamsError;
    const getAllThreadsByBoardIdResponse = await getAllThreadsByBoardId({
      context,
      boardId: boardId as string,
    });
    return {
      props: {
        ...props,
        board: getAllThreadsByBoardIdResponse.data.board,
        threadList: getAllThreadsByBoardIdResponse.data.threadList,
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
  board: Board;
  threadList: Thread[];
}
export default ({ currentUser, board, threadList }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const { t: boardsTranslation } = useTranslation('boards');
  const { t: threadsTranslation } = useTranslation('threads');
  const router = useRouter();

  const onClickBoardListItem = (boardId: string) =>{
    router.push({
      pathname: '/boards',
      query: {
        boardId
      },
    });
  }

  return (
    <Container currentUser={currentUser}>
      <Page setPadding>
        <Text variant='h2' align='center'>
          {boardsTranslation(board.i18nKey)}
        </Text>
        {threadList.map((thread: Thread) => (
          <div>
            {thread.name}
          </div>
        ))}
      </Page>
    </Container>
  );
};
