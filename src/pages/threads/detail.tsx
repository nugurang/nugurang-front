import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Container from '@/compositions/container/Container';
import { WithCheckUserServerSideProps, WithCheckUserServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { getAllArticleVoteTypes, createArticleVote } from '@/services/api/article';
import { getThread } from '@/services/api/thread';
import InvalidQueryParamsError from '@/errors/common/InvalidQueryParamsError';
import Page from '@/compositions/page/Page';
import Sidebar from '@/compositions/page/Sidebar';
import Main from '@/compositions/page/Main';
import { useCallback, useEffect, useState } from 'react';
import VirtuallyInfiniteScrollList from '@/components/list/VirtuallyInfiniteScrollList';
import ThreadArticleListItem from '@/compositions/thread/ThreadArticleListItem';
import { ThreadDTO } from '@/dtos/thread';
import { ArticleDTO, ArticleVoteTypeDTO } from '@/dtos/article';
import ThreadFirstArticle from '@/compositions/thread/ThreadFirstArticle';

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
    const getAllArticleVoteTypesResponse = await getAllArticleVoteTypes({
      context,
    });
    return {
      props: {
        ...props,
        thread: getThreadResponse.data.thread,
        firstArticle: getThreadResponse.data.firstArticle,
        articleVoteTypes: getAllArticleVoteTypesResponse.data.articleVoteTypeList,
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
  articleVoteTypes: ArticleVoteTypeDTO[];
}
export default ({ currentUser, thread, firstArticle, articleVoteTypes }: PageProps) => {
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

  const handleClickThreadListItemStarButton = async (article: ArticleDTO) => {
    try {
      console.log(article)
      const articleVoteTypeId = articleVoteTypes.find(voteType => voteType.name === "STAR")?.id;
      if(!articleVoteTypeId) throw new Error();
      
      const response = await createArticleVote({
        userId: currentUser.id,
        articleId: article.id,
        articleVoteTypeId,
      });
      console.log(response)
      if(response?.data?.id) {
        router.replace(router.asPath)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container currentUser={currentUser}>
      <Page>
        <Sidebar>Left</Sidebar>
        <Main fullHeight>
          <VirtuallyInfiniteScrollList
            listHeader={(
              <ThreadFirstArticle 
                article={firstArticle}
                onClickThumbsUpButton={handleClickThreadListItemStarButton}
                onClickThumbsDownButton={handleClickThreadListItemStarButton}
                onClickStarButton={handleClickThreadListItemStarButton}
             />
            )}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            onLoadMore={handleLoadMore}
          >
            {articleList.slice(1).map((article: ArticleDTO) => (
              <ThreadArticleListItem
                key={article.id}
                article={article}
                onClickThumbsUpButton={handleClickThreadListItemStarButton}
                onClickThumbsDownButton={handleClickThreadListItemStarButton}
                onClickStarButton={handleClickThreadListItemStarButton}
              />
            ))}
          </VirtuallyInfiniteScrollList>
        </Main>
        <Sidebar>Right</Sidebar>
      </Page>
    </Container>
  );
};
