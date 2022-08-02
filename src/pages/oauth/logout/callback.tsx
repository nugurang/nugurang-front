import { destroyCookie } from "@/utilities/cookie";
import { getLastUrlBeforeAuthPage } from "@/utilities/route";

export async function getServerSideProps(context) {
  const lastUrlBeforeAuthPage = getLastUrlBeforeAuthPage(context);
  try {
    destroyCookie(context, "oAuthProvider");
    destroyCookie(context, "oAuthAuthorizationCode");
    return {
      redirect: {
        permanent: false,
        destination: lastUrlBeforeAuthPage,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: lastUrlBeforeAuthPage,
      },
    };
  }
}

const OAuthLogoutCallback = () => {
  return <></>;
};

export default OAuthLogoutCallback;
