import { destroyCookie, parseHeaderSetCookie, setCookie } from '@/src/utils/cookie';

import { createCurrentUser } from '@/src/backend/dao/user';
import { createImage } from '@/src/backend/dao/image';
import { parseCookies } from '@/src/utils/cookie';

export const register = async (context: any, session: any) => {
  let imageId = null;
  if (session.user?.image) {
    const createImageResponse = await createImage(context, {
      address: session.user?.image
    });
    if (createImageResponse.data) imageId = createImageResponse.data.id;
  }
  const createCurrentUserResponse = await createCurrentUser(context, {
    name: session.user?.name,
    email: session.user?.email,
    biography: '',
    image: imageId,
  }) as any;
  return createCurrentUserResponse.data;
};

export const login = async (context: any, session: any) => {

  if(!session) throw new Error('Session not found');

  try {
    
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

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }

};

export const logout = async (context: any) => {
  destroyCookie(context, {
    key: 'JSESSIONID',
    props: {
      path: '/'
    }
  });
};

export const isJSessionIdExistFromCookie = (context: any) => !!parseCookies(context)?.JSESSIONID;
