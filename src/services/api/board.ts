import { ApolloQueryResult, gql } from '@apollo/client';
import { queryToBackend } from '@/utilities/network/graphQl';
import { GetServerSidePropsContextAdapter } from '@/constants/common';
import { getBoardNameI18nKey } from '@/constants/board';

export interface GetAllBoardsProps extends GetServerSidePropsContextAdapter {}
interface GetAllBoardsResponseRawListItem {
  id: string;
  name: string;
}
export interface Board {
  id: string;
  i18nKey: string;
  isEvent: boolean;
}
export interface GetAllBoardsResponse {
  data: {
    boardList: Board[];
    eventBoardList: Board[];
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
  }));
  const eventBoardList = response.data.boards
  .filter((board: GetAllBoardsResponseRawListItem) => (board.name.endsWith('_event')))
  .map((board: GetAllBoardsResponseRawListItem) => ({
    ...board,
    i18nKey: getBoardNameI18nKey(board.name),
    isEvent: true,
  }));
  return {
    data: {
      boardList,
      eventBoardList
    }
  };
};
