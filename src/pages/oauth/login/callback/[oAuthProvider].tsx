import { setCookie } from "@/utilities/cookie";
import { login } from "@/services/backend";
import { getLastUrlBeforeAuthPage } from "@/utilities/route";

export async function getServerSideProps(context) {
  const { oAuthProvider } = context.params;
  const { error } = context.query;
  const lastUrlBeforeAuthPage = getLastUrlBeforeAuthPage(context);

  if (error) {
    console.error(error);
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  } else {
    switch (oAuthProvider) {
      case "github":
        {
          const { code, state, provider } = context.query; // The temporary code will expire after 10 minutes. Visit https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
          setCookie(context, "oAuthProvider", "github");
          setCookie(context, "oAuthAuthorizationCode", code);
          const response = await login("github", code);
        }
        return {
          redirect: {
            permanent: false,
            destination: lastUrlBeforeAuthPage,
          },
        };
      default:
        return {
          redirect: {
            permanent: false,
            destination: lastUrlBeforeAuthPage,
          },
        };
    }
  }
}

const OAuthLoginCallback = () => {
  return <></>;
};

export default OAuthLoginCallback;