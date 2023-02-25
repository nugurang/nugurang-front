import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { getBoard } from '@/services/api/board';
import InvalidQueryParamsError from '@/errors/common/InvalidQueryParamsError';
import BoardBanner from '@/compositions/board/BoardBanner';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';
import { useCallback, useEffect, useRef, useState } from 'react';
import VirtuallyInfiniteScrollList, { VirtuallyInfiniteScrollListHandle } from '@/components/list/VirtuallyInfiniteScrollList';
import BoardThreadListItem from '@/compositions/board/BoardThreadListItem';
import { BoardDTO } from '@/dtos/board';
import { ThreadDTO } from '@/dtos/thread';
import FloatingBottomActionBox from '@/compositions/page/FloatingBottomActionBox';
import BoardThreadListActions from '@/compositions/board/BoardThreadListActions';

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
  const listRef = useRef<VirtuallyInfiniteScrollListHandle | null>();

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

  const handleClickBoardListItem = (threadId: string) => {
    router.push({
      pathname: '/threads/detail',
      query: {
        threadId
      },
    });
  };

  const handleClickCreateThreadButton = () => {
  };

  const handleClickMoveToTopButton = () => {
    listRef.current?.moveToTop()
  };

  return (
    <Container currentUser={currentUser}>
      <Page>
        <Sidebar>Left</Sidebar>
        <Main fullHeight>
          <VirtuallyInfiniteScrollList
            ref={listRef}
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
                onClick={() => handleClickBoardListItem(thread.id)}
              />
            ))}
          </VirtuallyInfiniteScrollList>
          <FloatingBottomActionBox>
            <BoardThreadListActions
              onClickCreateThreadButton={handleClickCreateThreadButton}
              onClickMoveToTopButton={handleClickMoveToTopButton}
            />
          </FloatingBottomActionBox>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
