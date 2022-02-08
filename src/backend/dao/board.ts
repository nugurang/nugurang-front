import { mutate, query } from '@/src/backend/transaction';

export interface CreateCurrentUserProps {
  names: string[];
}
export const getBoardsByNames = async (context: any, props: CreateCurrentUserProps) => {
  const response = await query(context, `
    query GetBoardsByNames($names: [String]!) {
      getBoardsByNames(names: $names) {
        id
        name
      }
    }
  `, props);
  return {
    data: response.data?.getBoardsByNames ?? null,
    error: response.error ?? null
  };
};
