import queryServerSide from "../utils/queryServerSide";
import {
  GetCurrentOAuth2UserQueryBuilder,
  GetCurrentUserQueryBuilder,
} from '../queries/user';

export default function withAuthServerSide(getServerSidePropsFunction) {
  return async (context) => {

    const currentOAuth2UserResult = await queryServerSide({
      context,
      query: new GetCurrentOAuth2UserQueryBuilder().build(),
    });
    if (currentOAuth2UserResult.data === undefined) {
      return {
        redirect: {
          destination: '/signin/',
          permanent: false
        }
      }
    }

    const currentUserResult = await queryServerSide({
      context,
      query: new GetCurrentUserQueryBuilder().build(),
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