import { ApolloQueryResult, gql } from '@apollo/client';
import { query } from '@/utilities/network/graphQl';
import AppErrors from '@/constants/appError';
import { GetServerSidePropsContextAdapter } from '@/constants/common';

export interface getPingProps extends GetServerSidePropsContextAdapter {}
export interface getPingResponse {
  data: {
    ping: string;
  }
}
export const getPing = async (props: getPingProps = {}) => {
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
