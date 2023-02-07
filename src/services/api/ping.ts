import { ApolloQueryResult, gql } from '@apollo/client';
import { queryToBackend } from '@/utilities/network/graphQl';
import { GetServerSidePropsContextAdapter } from '@/constants/common';

export interface GetPingProps extends GetServerSidePropsContextAdapter {}
interface GetPingResponseRawData {
  ping: string;
}
export interface Ping {
  ping: string;
}
export interface GetPingResponse {
  data: Ping
}
export const getPing = async (props: GetPingProps = {}) => {
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query Ping {
        ping
      }
    `,
    context: props.context
  });
  return {
    data: response.data.ping
  };
};
