import { destroyCookie } from "@/utilities/common/cookie";
import { getLastUrlBeforeAuthPage } from "@/utilities/route";

export async function getServerSideProps(context) {
  const lastUrlBeforeAuthPage = getLastUrlBeforeAuthPage(context);
  try {
    destroyCookie(context, "JSESSIONID");
    destroyCookie(context, "lastUrlBeforeAuthPage");
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
