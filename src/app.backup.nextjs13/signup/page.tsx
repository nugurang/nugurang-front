import { createUser } from '@/services/api/user';
import ServerRouterAuthManager from "@/services/router/serverRouterAuth";
import SignupFragment from './SignupFragment';
import type { PlainObject } from '@/constants/common';
import { oAuth2Login } from '@/services/oAuth2/index';

export default async () => {
  const { currentOAuth2User } = await ServerRouterAuthManager.checkOAuth2UserLoggedIn();
  const submitForm = async (formValues: PlainObject) => {
    const response = await createUser({
      name: formValues.username,
      email: formValues.email,
      biography: formValues.biography ?? undefined,
    });
    if (response.data.id) {
      await oAuth2Login(currentOAuth2User.oAuth2Provider);
    }
  }

  return (
    <SignupFragment 
      initialValue={{
        username: currentOAuth2User.username,
        email: currentOAuth2User.email
      }}
      submitForm={submitForm}
    />
  );
}
