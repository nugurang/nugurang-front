import { mutate, query } from '@/src/backend/transaction';

export interface GetBoardsByNamesProps {
  names: string[];
}
export const getBoardsByNames = async (context: any, props: GetBoardsByNamesProps) => {
  const response = await query(context, `
    query GetBoardsByNames($names: [String]!) {
      getBoardsByNames(names: $names) {
        id
        name
      }
    }
  `, props);
  return {
    data: response.data?.getBoardsByNames ?? null
  };
};

export interface CreateBoardProps {
  name: string;
}
export const createBoard = async (context: any, props: CreateBoardProps) => {
  const response = await query(context, `
    mutation CreateBoard($board: BoardInput!) {
      createBoard(board: $board) {
        id
        name
      }
    }
  `, {
    board: props
  });
  return {
    data: response.data?.createBoard ?? null
  };
};
