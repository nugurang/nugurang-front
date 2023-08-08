import { Client, cacheExchange, createClient, fetchExchange } from "urql/core";
import { registerUrql } from '@urql/next/rsc';
import { cookies } from 'next/headers'

let _client: Client | null = null;

const createBackendGraphqlClient = () => {
  if (!_client) {
    _client = createClient({
      url: "http://localhost:3000/api/dev-backend/graphql",
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: () => {
        const cookieStore = cookies()
        const allCookies = cookieStore.getAll()
        const jSessionIdCookie = cookieStore.get('JSESSIONID')
        const JSESSIONID = jSessionIdCookie?.value
        return {
          headers: {
            Cookie: `JSESSIONID=${JSESSIONID}`
          },
        };
      },
    });
  }
  const client = _client;
  return client;
};

const createUrqlResponse = registerUrql(createBackendGraphqlClient);
const getBackendGraphqlClient = createUrqlResponse.getClient

export {
  getBackendGraphqlClient
}
