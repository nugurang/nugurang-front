import { signIn, signOut } from 'next-auth/react';

export const login = (providerName: string, callbackUrl: string) => {
  signIn(providerName, {
    callbackUrl: `/session/after-login?callbackUrl=${callbackUrl}`
  });
};

export const logout = (callbackUrl: string) => {
  signOut({
    callbackUrl: `/session/after-logout?callbackUrl=${callbackUrl}`
  });
};
