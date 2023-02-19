import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import Section from '@/compositions/page/Section';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { getBoard } from '@/services/api/board';
import InvalidQueryParamsError from '@/errors/common/InvalidQueryParamsError';
import Article from '@/compositions/page/Article';
import BoardBanner from '@/compositions/board/BoardBanner';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';
import { useCallback, useEffect, useState } from 'react';
import VirtuallyInfiniteScrollList from '@/components/list/VirtuallyInfiniteScrollList';
import BoardThreadListItem from '@/compositions/board/BoardThreadListItem';
import { BoardDTO } from '@/dtos/board';
import { ThreadDTO } from '@/dtos/thread';

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
        // threadList: getBoardResponse.data.threadList,
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
  board: BoardDTO;
  threadList: ThreadDTO[];
}
export default ({ currentUser, board }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const { t: boardsTranslation } = useTranslation('boards');
  const { t: threadsTranslation } = useTranslation('threads');
  const router = useRouter();
  const [threadList, setThreadList] = useState<ThreadDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

  const fetchMore = useCallback(async () => {
    await wait(1000);
    const getBoardResponse = await getBoard({
      boardId: board.id,
      pagination: {
        page,
      }
    });
    const moreThreadList = getBoardResponse.data.threadList;
    if(moreThreadList.length <= 0) {
      setHasNextPage(_ => false);
    } else {
      setThreadList([ ...threadList, ...moreThreadList ]);
    }
    setLoading(_ => false);
  }, [page, threadList]);
  
  useEffect(() => {
    if (isLoading && hasNextPage) {
      setPage(prevPage => prevPage + 1);
      fetchMore();
    } else {
      setLoading(_ => false);
    }
  }, [isLoading, hasNextPage]);

  const handleLoadMore = () => {
    setLoading(_ => true);
  };

  const onClickBoardListItem = (boardId: string) =>{
    router.push({
      pathname: '/boards',
      query: {
        boardId
      },
    });
  };

  return (
    <Container currentUser={currentUser}>
      <Page>
        <Sidebar>Left</Sidebar>
        <Main fullHeight>
          <VirtuallyInfiniteScrollList
            listHeader={(
              <BoardBanner board={board} />
            )}
            listItemMinWidthPixel={240}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            onLoadMore={handleLoadMore}
          >
            {threadList.map((thread: ThreadDTO) => (
              <BoardThreadListItem
                key={thread.id}
                thread={thread}
              />
            ))}
          </VirtuallyInfiniteScrollList>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
