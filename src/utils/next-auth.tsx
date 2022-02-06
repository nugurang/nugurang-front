import { signIn, signOut } from 'next-auth/react';

interface LoginToNextAuthProps {
  providerName: string;
  callbackUrl?: string;
}

export const loginToNextAuth = (props: LoginToNextAuthProps) => {
  signIn(props.providerName, {
    callbackUrl: props.callbackUrl
  });
};

interface LogoutFromNextAuthProps {
  callbackUrl?: string;
  redirect?: boolean;
}

export const logoutFromNextAuth = (props: LogoutFromNextAuthProps = {}) => {
  signOut({
    callbackUrl: props.callbackUrl,
    redirect: props.redirect ?? true,
  });
};
