import { parseCookies, stringifyCookies } from '@/src/utils/cookie';

import apolloClient from '@/src/utils/apollo-client';
import { gql } from '@apollo/client';

export const queryToBackend = async (context: any, query: string, variables?: any) => {
  const cookies = parseCookies({ context });
  try {
    const queryResponse = await apolloClient.query({
      query: gql(query),
      variables,
      context: {
        headers: {
          cookie: stringifyCookies(cookies)
        }
      }
    });
    return queryResponse;
  } catch (error: any) {
    return {
      data: null,
      error
    };
  }
};

export const mutateToBackend = async (context: any, mutation: string, variables?: any) => {
  const cookies = parseCookies({ context });
  try {
    const mutationResponse = await apolloClient.mutate({
      mutation: gql(mutation),
      variables,
      context: {
        headers: {
          cookie: stringifyCookies(cookies)
        }
      }
    });
    return mutationResponse;
  } catch (error: any) {
    return {
      data: null,
      error
    };
  }
};
