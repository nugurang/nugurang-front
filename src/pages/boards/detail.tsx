import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import Section from '@/compositions/page/Section';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import type { Board } from '@/services/api/board';
import { getBoard } from '@/services/api/board';
import { Thread } from '@/services/api/thread';
import InvalidQueryParamsError from '@/errors/common/InvalidQueryParamsError';
import Article from '@/compositions/page/Article';
import UnorderedList from '@/components/list/UnorderedList';
import BoardBanner from '@/compositions/board/BoardBanner';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';

export const getServerSideProps = WithCheckUserServerSideProps(async (
  context: GetServerSidePropsContext,
  props: WithCheckUserServerSidePropsResponse,
) => {
  try {
    const { boardId } = context.query;
    if(!boardId) throw new InvalidQueryParamsError;
    const getBoardResponse = await getBoard({
      context,
      boardId: boardId as string,
    });
    return {
      props: {
        ...props,
        board: getBoardResponse.data.board,
        threadList: getBoardResponse.data.threadList,
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
      <Page>
        <Sidebar>Left</Sidebar>
        <Main>
          <BoardBanner board={board} />
          <Section title={boardsTranslation(`boards.${board.i18nKey}`)}>
            <Article>
              <UnorderedList
                gap={'16px'}
              >
              {threadList.map((thread: Thread) => (
                <div key={thread.id}>
                  {thread.name}
                </div>
              ))}
              </UnorderedList>
            </Article>
          </Section>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
