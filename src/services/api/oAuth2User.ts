import { ApolloQueryResult, gql } from '@apollo/client';
import { query } from '@/utilities/network/graphQl';
import type { ApplicationQueryError } from '@/utilities/network/graphQl';
import ObjectManager from '@/utilities/common/object';
import AppErrors from '@/constants/appError';
import { GetServerSidePropsContextAdapter } from '@/constants/common';

export interface getCurrentOAuth2UserProps extends GetServerSidePropsContextAdapter {}
export interface getCurrentOAuth2UserResponse {
  data: {
    oAuth2Provider: string;
    name: string;
    email: string;
    biography: string;
  }
}
export const getCurrentOAuth2User = async (props: getCurrentOAuth2UserProps) => {
  try {
    const response: ApolloQueryResult<any> = await query({
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
      context: props.context
    });
    ObjectManager.replaceObjectProperty(response.data, 'id', 'oAuth2Provider');
    return {
      data: response.data
    };
  } catch(error) {
    if((error as ApplicationQueryError).statusCode === 401) {
      throw AppErrors.auth.OAuth2UserNotExistError;
    } else {
      throw AppErrors.auth.OAuth2LoginInternalError;
    }
  }
};
