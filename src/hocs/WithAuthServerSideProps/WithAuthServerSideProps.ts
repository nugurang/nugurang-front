import { gql } from "@apollo/client";
import { query } from "@/services/backend";
import { frontendRootUrl } from "@/constants/url";

export default function WithAuthServerSideProps(getServerSidePropsFunction?) {
  return async (context) => {
    const currentOAuth2UserResult = await query({
      context,
      query: gql`
        query CurrentOAuth2User {
          currentOAuth2User {
            id
            name
            email
          }
        }
      `,
    });
    console.log(currentOAuth2UserResult);
    if (
      !currentOAuth2UserResult.data ||
      currentOAuth2UserResult.data.currentOAuth2User === null
    ) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const currentUserResult = await query({
      context,
      query: gql`
        query CurrentUser {
          currentUser {
            id
            oauth2Provider
            oauth2Id
            name
            email
            image {
              id
              address
            }
            biography
          }
        }
      `,
    });
    if (currentUserResult.data.currentUser === null) {
      return {
        redirect: {
          destination: "/signup",
          permanent: false,
        },
      };
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
    };
  };
}
