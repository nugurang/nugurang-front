import { signIn, signOut } from 'next-auth/react';

interface LoginToSessionProps {
  providerName: string;
  callbackUrl?: string;
}

export const loginToSession = (props: LoginToSessionProps) => {
  signIn(props.providerName, {
    callbackUrl: `/session/after-login?callbackUrl=${props?.callbackUrl ?? '/'}`
  });
};

interface LogoutFromSessionProps {
  callbackUrl?: string;
}

export const logoutFromSession = (props: LogoutFromSessionProps) => {
  signOut({
    callbackUrl: `/session/after-logout?callbackUrl=${props?.callbackUrl ?? '/'}`,
    redirect: !!props?.callbackUrl,
  });
};
