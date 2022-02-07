import { destroyCookie, parseHeaderSetCookie, setCookie } from '@/src/utils/cookie';
import { parseCookies, stringifyCookies } from '@/src/utils/cookie';

import apolloClient from '@/src/utils/apollo-client';
import { gql } from '@apollo/client';

export const pingToBackend = async (context: any) => {
  const pingResponse = await queryToBackend(context, `
    query Ping {
      ping
    }
  `);
  return pingResponse?.data?.ping;
};

export const queryToBackend = async (context: any, query: string, variables?: any) => {
  const cookies = parseCookies(context);
  try {
    const queryResponse = await apolloClient.query({
      query: gql(query),
      variables,
      context: {
        headers: {
          cookie: stringifyCookies(cookies)
        }
      }
    });
    return queryResponse;
  } catch (error: any) {
    return {
      data: null,
      error
    };
  }
};

export const mutateToBackend = async (context: any, mutation: string, variables?: any) => {
  const cookies = parseCookies(context);
  try {
    const mutationResponse = await apolloClient.mutate({
      mutation: gql(mutation),
      variables,
      context: {
        headers: {
          cookie: stringifyCookies(cookies)
        }
      }
    });
    return mutationResponse;
  } catch (error: any) {
    return {
      data: null,
      error
    };
  }
};

export const registerToBackend = async (context: any, session: any) => {

  try {
    let imageId;
    if (session.user!.image) {
      const createImageResponse = await mutateToBackend(context, `
        mutation CreateImage($address: String!) {
          createImage (address: $address) {
            id
            address
          }
        }
      `, {
        address: session.user!.image
      });
      if (createImageResponse.hasOwnProperty('error')) throw new Error('Unknown Error');
      imageId = createImageResponse.data.createImage.id;
    }
    const createCurrentUserResponse = await mutateToBackend(context, `
      mutation CreateCurrentUser($user: UserInput!) {
        createCurrentUser (user: $user) {
          id
        }
      }
    `, {
      user: {
        name: session.user!.name,
        email: session.user!.email,
        biography: '',
        image: imageId,
      }
    }) as any;
    if (createCurrentUserResponse.hasOwnProperty('error')) throw new Error('Unknown Error');
    return createCurrentUserResponse.data.createCurrentUser;
  } catch {
    return false;
  }
};

export const loginToBackend = async (context: any, session: any) => {

  if(!session) throw new Error('Session not found');

  const getJSessionResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL as string,
    },
    body: JSON.stringify({
      clientRegistrationId: session.provider,
      refreshToken: {
        tokenValue: session.accessToken,
        issuedAt: session.issued,
        expiresAt: session.expires,
      },
      accessToken: {
        tokenValue: session.accessToken,
        issuedAt: session.issued,
        expiresAt: session.expires,
        scopes: session.scopes,
      },
      additionalParameters: {}
    })
  });

  const setCookieRawString = getJSessionResponse.headers.get('set-cookie');
  if(!setCookieRawString) throw new Error('set-cookie header not found');

  const { JSESSIONID, Path } = parseHeaderSetCookie(setCookieRawString);
  if(!JSESSIONID || !Path) throw new Error('Cookie is not valid');

  setCookie(context, {
    key: 'JSESSIONID', 
    value: JSESSIONID, 
    props: {
      maxAge: parseInt(process.env.COOKIE_MAX_AGE as string),
      path: Path,
    }
  });

};

export const logoutFromBackend = async (context: any) => {
  destroyCookie(context, {
    key: 'JSESSIONID',
    props: {
      path: '/'
    }
  });
};

export const getCurrentUserFromBackend = async (context: any) => {
  const currentUserResponse = await queryToBackend(context, `
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
  `);
  console.log(currentUserResponse)
  return currentUserResponse?.data?.currentUser ?? null;
}

export const isJSessionIdExistFromCookie = (context: any) => !!parseCookies(context)?.JSESSIONID;
