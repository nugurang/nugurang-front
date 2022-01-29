import { parseCookies, stringifyCookies } from '@/src/utils/cookie';

import apolloClient from '@/src/utils/apollo-client';
import { gql } from '@apollo/client';

export const queryToBackend = async (context: any, query: string) => {
  const cookies = parseCookies(context);
  try {
    const queryResponse = await apolloClient.query({
      query: gql(query),
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
}
