import { queryToBackend } from "./requestToBackend";
import {
  GetCurrentOAuth2UserQueryBuilder,
  GetCurrentUserQueryBuilder,
} from '../queries/user';

export default function withAuthServerSide(getServerSidePropsFunction) {
  return async (context) => {

    const currentOAuth2UserResult = await queryToBackend({
      context,
      query: new GetCurrentOAuth2UserQueryBuilder().build(),
    });
    if (!currentOAuth2UserResult.data
      || currentOAuth2UserResult.data.currentOAuth2User === null) {
      return {
        redirect: {
          destination: '/signin/',
          permanent: false
        }
      }
    }

    const currentUserResult = await queryToBackend({
      context,
      query: new GetCurrentUserQueryBuilder().build(),
    });
    if (currentUserResult.data.currentUser === null) {
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
    }
      return {
        props: {
          currentUser: currentUserResult.data.currentUser,
        },
      }


  }
}