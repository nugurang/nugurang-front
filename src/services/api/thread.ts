import produce from 'immer';
import { ApolloQueryResult, gql } from '@apollo/client';
import { mutateToBackend, queryToBackend } from '@/utilities/network/graphQl';
import { getImageUrl, GetServerSidePropsContextAdapter } from '@/constants/common';
import { Pagination } from './common';
import { ThreadDTO } from '@/dtos/thread';
import { ArticleDTO } from '@/dtos/article';

export interface getThreadProps extends GetServerSidePropsContextAdapter {
  threadId: string;
  pagination?: Pagination;
}
interface getThreadResponseRawListItem {
  id: string;
  name: string;
}
export interface getThreadResponse {
  data: {
    thread: ThreadDTO,
    firstArticle: ArticleDTO;
    articleList: ArticleDTO[];
  }
}
export const getThread = async (props: getThreadProps) => {
  const { threadId, pagination } = props;
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query getThread {
        getThread(id: ${threadId}) {
          id
          name
          getArticles(page: ${pagination?.page ?? 0}, pageSize: ${pagination?.pageSize ?? 12}) {
            id
            user {
              id
              name
            }
            title
            content
            upCount
            downCount
            starCount
          }
          firstArticle {
            id
            user {
              id
              name
            }
            title
            content
            upCount
            downCount
            starCount
          }
        }
      }
    `,
    context: props.context
  });
  const threadRaw = response.data?.getThread;
  const imageUrl = getImageUrl({ keyword: 'test' });
  const firstArticle = {
    ...threadRaw.firstArticle,
    images: [
      {
        id: '',
        address: imageUrl,
      }
    ],
  };
  const articleList = response.data?.getThread?.getArticles.map((article: ArticleDTO) => {
    const imageUrl = getImageUrl({ keyword: 'test' });
    return produce(article,
      (draft: ArticleDTO) => {
        draft.images = [
          {
            id: '',
            address: imageUrl,
          }
        ];
      }
    );
  });
  return {
    data: {
      thread: {
        id: threadRaw.id,
        name: threadRaw.name,
      },
      firstArticle,
      articleList,
    }
  };
};

interface CreateThreadMutationProps extends GetServerSidePropsContextAdapter {
  boardId: string;
  thread: {
    name: string;
    event?: string;
    team?: string;
  };
  firstArticle: {
    title: string;
    content: string;
    images?: string[];
  };
}
export const createThread = async (props: CreateThreadMutationProps) => {
  const { boardId, thread, firstArticle } = props; 
  const response = await mutateToBackend({
    mutation: gql`
      mutation createThread($board: ID!, $thread: ThreadInput!) {
        createThread (board: $board, thread: $thread) {
          id
        }
      }
    `,
    variables: {
      board: boardId,
      thread: {
        ...thread,
        firstArticle,
      },
    },
    context: props.context
  });
  return {
    data: response.data.createThread
  };
};
