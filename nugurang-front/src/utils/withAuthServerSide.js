import graphQlClient from "../graphQlClient";
import {
  GetCurrentOAuth2UserQueryBuilder,
  GetCurrentUserQueryBuilder,
} from '../queries/user';

export default function withAuthServerSide(getServerSidePropsFunction) {
  return async (context) => {

    const currentOAuth2UserResult = await graphQlClient.query({
      query: new GetCurrentOAuth2UserQueryBuilder().build(),
    }).catch(error => {
      return {
        error,
      }
    });
    if (currentOAuth2UserResult.data === undefined) {
      return {
        redirect: {
          destination: '/signin/',
          permanent: false
        }
      }
    }

    const currentUserResult = await graphQlClient.query({
      query: new GetCurrentUserQueryBuilder().build(),
    }).catch(error => {
      return {
        error,
      }
    });
    if (currentUserResult.data === undefined) {
      return {
        redirect: {
          destination: '/signup/',
          permanent: false
        }
      }
    }

    if (getServerSidePropsFunction) {
      return await getServerSidePropsFunction({
        context,
        currentUser: currentUserResult.data.currentUser,
      });
    } else {
      return {
        props: {
          currentUser: currentUserResult.data.currentUser,
        },
      }
    }

  }
}