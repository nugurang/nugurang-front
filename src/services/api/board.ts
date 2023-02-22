import produce from 'immer';
import { ApolloQueryResult, gql } from '@apollo/client';
import { queryToBackend } from '@/utilities/network/graphQl';
import { getImageUrl, GetServerSidePropsContextAdapter } from '@/constants/common';
import { getBoardImageKeyword, getBoardNameI18nKey } from '@/constants/board';
import { Pagination } from './common';
import { BoardDTO } from '@/dtos/board';
import { ThreadDTO } from '@/dtos/thread';

export interface GetAllBoardsProps extends GetServerSidePropsContextAdapter {}
interface GetAllBoardsResponseRawListItem {
  id: string;
  name: string;
}
export interface GetAllBoardsResponse {
  data: {
    boardList: BoardDTO[];
    eventBoardList: BoardDTO[];
  }
}
export const getAllBoards = async (props: GetAllBoardsProps = {}) => {
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query getAllBoards {
        boards {
          id
          name
        }
      }
    `,
    context: props.context
  });
  const boardList = response.data.boards
  .filter((board: GetAllBoardsResponseRawListItem) => !(board.name.endsWith('_event')))
  .map((board: GetAllBoardsResponseRawListItem) => ({
    ...board,
    i18nKey: getBoardNameI18nKey(board.name),
    isEvent: false,
    imageUrl: getImageUrl({ keyword: getBoardImageKeyword(board.name) }),
  }));
  const eventBoardList = response.data.boards
  .filter((board: GetAllBoardsResponseRawListItem) => (board.name.endsWith('_event')))
  .map((board: GetAllBoardsResponseRawListItem) => ({
    ...board,
    i18nKey: getBoardNameI18nKey(board.name),
    isEvent: true,
    imageUrl: getImageUrl({ keyword: getBoardImageKeyword(board.name) }),
  }));
  return {
    data: {
      boardList,
      eventBoardList
    }
  };
};

export interface getBoardProps extends GetServerSidePropsContextAdapter {
  boardId: string;
  pagination?: Pagination;
}
interface getBoardResponseRawListItem {
  id: string;
  name: string;
}
export interface getBoardResponse {
  data: {
    board: BoardDTO,
    threadList: ThreadDTO[];
  }
}
export const getBoard = async (props: getBoardProps) => {
  const { boardId, pagination } = props;
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query getBoard {
        getBoard(id: ${boardId}) {
          id
          name
          getThreads(page: ${pagination?.page ?? 0}, pageSize: ${pagination?.pageSize ?? 12}) {
            id
            name
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
      }
    `,
    context: props.context
  });
  const boardRaw = response.data?.getBoard;
  const board: BoardDTO = {
    id: boardRaw.id,
    i18nKey: getBoardNameI18nKey(boardRaw.name),
    isEvent: boardRaw.isEvent ?? false,
    imageUrl: getImageUrl({ keyword: getBoardImageKeyword(boardRaw.name) }),
  };
  const threadList = response.data?.getBoard?.getThreads.map((thread: ThreadDTO) => {
    const imageUrl = getImageUrl({ keyword: 'test' });
    return produce(thread,
      (draft: ThreadDTO) => {
        draft.firstArticle.images = [
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
      board,
      threadList,
    }
  };
};
