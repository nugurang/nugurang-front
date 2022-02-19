import { parseCookies, stringifyCookies } from '@/utils/cookie';

import apolloClient from '@/utils/apollo-client';
import { gql } from '@apollo/client';

export const ping = async (context: any) => {
  try {
    const response = await query(context, `
      query Ping {
        ping
      }
    `);
    return response;
  } catch (error) {
    return {
      data: null,
      error: error
    };
  }
};

export const query = async (context: any, query: string, variables?: any) => {
  const cookies = parseCookies(context);
  try {
    const response = await apolloClient.query({
      query: gql(query),
      variables,
      context: {
        headers: {
          cookie: stringifyCookies(cookies)
        }
      }
    });
    return response;
  } catch (error) {
    return {
      data: null,
      error: error
    };
  }
};

export const mutate = async (context: any, mutation: string, variables?: any) => {
  const cookies = parseCookies(context);
  try {
    const response = await apolloClient.mutate({
      mutation: gql(mutation),
      variables,
      context: {
        headers: {
          cookie: stringifyCookies(cookies)
        }
      }
    });
    return response;
  } catch (error) {
    return {
      data: null,
      error: error
    };
  }
};
