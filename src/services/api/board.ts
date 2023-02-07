import { ApolloQueryResult, gql } from '@apollo/client';
import { queryToBackend } from '@/utilities/network/graphQl';
import { GetServerSidePropsContextAdapter } from '@/constants/common';
import { OAuth2Provider } from '@/constants/oAuth2';

export interface GetAllBoardsProps extends GetServerSidePropsContextAdapter {}
export interface GetAllBoardsResponseData {
  oAuth2Provider: OAuth2Provider;
  name: string;
  email: string;
}
export interface GetAllBoardsResponse {
  data: GetAllBoardsResponseData
}
export const getAllBoards = async (props: GetAllBoardsProps = {}) => {
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query getAllBoards {
        boards {
          id
          name
          getThreads(page: 0, pageSize: 10) {
            id
            name
          }
        }
      }
    `,
    context: props.context
  });
  return {
    data: response.data.boards
  };
};
