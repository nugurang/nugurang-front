import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { getThread } from '@/services/api/thread';
import InvalidQueryParamsError from '@/errors/common/InvalidQueryParamsError';
import Article from '@/compositions/page/Article';
import ThreadBanner from '@/compositions/thread/ThreadBanner';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';
import { useCallback, useEffect, useState } from 'react';
import VirtuallyInfiniteScrollList from '@/components/list/VirtuallyInfiniteScrollList';
import ThreadArticleListItem from '@/compositions/thread/ThreadArticleListItem';
import { ThreadDTO } from '@/dtos/thread';
import { ArticleDTO } from '@/dtos/article';
import ThreadFirstArticle from '@/compositions/thread/ThreadFirstArticle';
import Card from '@/components/paper/Card';

export const getServerSideProps = WithCheckUserServerSideProps(async (
  context: GetServerSidePropsContext,
  props: WithCheckUserServerSidePropsResponse,
) => {
  try {
    const { threadId } = context.query;
    if(!threadId) throw new InvalidQueryParamsError;
    const getThreadResponse = await getThread({
      context,
      threadId: threadId as string,
    });
    return {
      props: {
        ...props,
        thread: getThreadResponse.data.thread,
        firstArticle: getThreadResponse.data.firstArticle,
        // articleList: getThreadResponse.data.articleList,
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
  thread: ThreadDTO;
  firstArticle: ArticleDTO;
}
export default ({ currentUser, thread, firstArticle }: PageProps) => {
  const { t: commonTranslation } = useTranslation('common');
  const { t: articlesTranslation } = useTranslation('articles');
  const router = useRouter();
  const [articleList, setArticleList] = useState<ArticleDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

  const fetchMore = useCallback(async () => {
    await wait(1000);
    const getThreadResponse = await getThread({
      threadId: thread.id,
      pagination: {
        page,
      }
    });
    const moreArticleList = getThreadResponse.data.articleList;
    if(moreArticleList.length <= 0) {
      setHasNextPage(_ => false);
    } else {
      setArticleList([ ...articleList, ...moreArticleList ]);
    }
    setLoading(_ => false);
  }, [page, articleList]);
  
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

  const onClickThreadListItem = (threadId: string) =>{
    router.push({
      pathname: '/threads',
      query: {
        threadId
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
              <ThreadFirstArticle article={firstArticle} />
            )}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            onLoadMore={handleLoadMore}
          >
            {articleList.slice(1).map((article: ArticleDTO) => (
              <ThreadArticleListItem
                key={article.id}
                article={article}
              />
            ))}
          </VirtuallyInfiniteScrollList>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
