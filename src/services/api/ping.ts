import { ApolloQueryResult, gql } from '@apollo/client';
import { query } from '@/utilities/network/graphQl';
import AppErrors from '@/constants/appError';
import { GetServerSidePropsContextAdapter } from '@/constants/common';

export interface GetPingProps extends GetServerSidePropsContextAdapter {}
export interface GetPingResponse {
  data: {
    ping: string;
  }
}
export const getPing = async (props: GetPingProps = {}) => {
  try {
    const response: ApolloQueryResult<any> = await query({
      query: gql`
        query Ping {
          ping
        }
      `,
      dataPropertyName: 'ping',
      context: props.context
    });
    return {
      data: response.data
    };
  } catch(error) {
    throw AppErrors.network.BackendConnectionLostError;
  }
};
