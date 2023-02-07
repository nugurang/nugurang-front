import { ApolloQueryResult, gql } from '@apollo/client';
import { queryToBackend } from '@/utilities/network/graphQl';
import ObjectManager from '@/utilities/common/object';
import { GetServerSidePropsContextAdapter } from '@/constants/common';
import { OAuth2Provider } from '@/constants/oAuth2';

export interface GetCurrentOAuth2UserProps extends GetServerSidePropsContextAdapter {}
interface GetCurrentOAuth2UserResponseRawData {
  id: OAuth2Provider;
  name: string;
  email: string;
}
export interface OAuth2User {
  oAuth2Provider: OAuth2Provider;
  name: string;
  email: string;
}
export interface GetCurrentOAuth2UserResponse {
  data: OAuth2User
}
export const getCurrentOAuth2User = async (props: GetCurrentOAuth2UserProps = {}) => {
  const response: ApolloQueryResult<any> = await queryToBackend({
    query: gql`
      query CurrentOAuth2User {
        currentOAuth2User {
          id
          name
          email
        }
      }
    `,
    context: props.context
  });
  ObjectManager.replaceObjectProperty(response.data.currentOAuth2User, 'id', 'oAuth2Provider');
  return {
    data: response.data.currentOAuth2User
  };
};
