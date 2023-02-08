import { ApolloQueryResult, gql } from '@apollo/client';
import { queryToBackend } from '@/utilities/network/graphQl';
import { GetServerSidePropsContextAdapter } from '@/constants/common';
import { Pagination } from './common';
import { Board } from '@/__generated__/resolvers-types';
import { getBoardNameI18nKey } from '@/constants/board';

export interface getAllThreadsByBoardIdProps extends GetServerSidePropsContextAdapter {
  boardId: string;
  pagination?: Pagination;
}
interface getAllThreadsByBoardIdResponseRawListItem {
  id: string;
  name: string;
}
export interface Thread {
  id: string;
  name: string;
}
export interface getAllThreadsByBoardIdResponse {
  data: {
    board: Board,
    threadList: Thread[];
  }
}
export const getAllThreadsByBoardId = async (props: getAllThreadsByBoardIdProps) => {
  const { boardId, pagination } = props;
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query getBoard {
        getBoard(id: ${boardId}) {
          id
          name
          getThreads(page: ${pagination?.page ?? 0}, pageSize: ${pagination?.pageSize ?? 10}) {
            id
            name
          }
        }
      }
    `,
    context: props.context
  });
  const boardRaw = response.data?.getBoard;
  const board = {
    id: boardRaw.id,
    i18nKey: getBoardNameI18nKey(boardRaw.name),
  };
  return {
    data: {
      board,
      threadList: response.data?.getBoard?.getThreads ?? [],
    }
  };
};
