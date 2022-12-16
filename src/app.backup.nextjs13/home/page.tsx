import ServerRouterAuthManager from "@/services/router/serverRouterAuth";
import LoginFragment from './LoginFragment';

export default async () => {
  const { currentUser } = await ServerRouterAuthManager.checkUserLoggedIn();

  return (
    <>
      <p>{currentUser.name}</p>
      <LoginFragment 
        isLoggedIn={false}
        username={'test'}
      />
    </>
  );
}
