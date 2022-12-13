import { ApolloQueryResult, gql } from '@apollo/client';
import { query } from '@/utilities/network/graphQl';
import type { IsomorphicGetServerSidePropsContext } from '@/utilities/common/isomorphism';


export const getCurrentOAuth2User = async (
  context: IsomorphicGetServerSidePropsContext,
) => {
  const result: ApolloQueryResult<any> = await query(context, {
    query: gql`
      query CurrentOAuth2User {
        currentOAuth2User {
          id
          name
          email
        }
      }
    `,
    dataPropertyName: 'currentOAuth2User',
  });
  if (result.data.id) {
    result.data.oAuth2Provider = result.data.id;
    delete result.data.id;
  }
  return result;
};

export default undefined;
