import nookies, {
  destroyCookie as destroyCookieFromNookies,
  parseCookies as parseCookiesFromNookies,
  setCookie as setCookieFromNookies,
} from 'nookies';
import CookieConstants from '@/constants/cookie';
import IsomorphismManager from '@/utilities/common/isomorphism';
import type { IsomorphicGetServerSidePropsContext } from '@/utilities/common/isomorphism';

interface SetCookieProps {
  maxAge?: number,
  path?: string
};
interface DeleteCookieProps {
  maxAge?: number,
  path?: string
};

const parseAndGetCookie = (
  context: IsomorphicGetServerSidePropsContext,
  cookieString: string,
  key: string
) => {
  const matches = cookieString.match(
    new RegExp(
      `(?:^|; )${key.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const getAllCookies = (context: IsomorphicGetServerSidePropsContext) => {
  if (IsomorphismManager.isServer) {
    return nookies.get(context);
  } else {
    return parseCookiesFromNookies();
  }
};

const getCookie = (context: IsomorphicGetServerSidePropsContext, name: string) => {
  return getAllCookies(context)[name] ?? null;
};

const setCookie = (context: IsomorphicGetServerSidePropsContext, name: string, value: string, props: SetCookieProps = {}) => {
  const propsWithDefaultValues = {
    ...props,
    maxAge: props?.maxAge || CookieConstants.defaultMaxAge,
    path: props?.path || CookieConstants.defaultPath,
  };
  if (IsomorphismManager.isServer) {
    return nookies.set(context, name, value, propsWithDefaultValues);
  } else {
    return setCookieFromNookies(null, name, value, propsWithDefaultValues);
  }
};

const deleteCookie = (context: IsomorphicGetServerSidePropsContext, name: string, props: DeleteCookieProps = {}) => {
  const propsWithDefaultValues = {
    ...props,
    path: props?.path || CookieConstants.defaultPath,
  };
  if (IsomorphismManager.isServer) {
    return nookies.destroy(context, name, propsWithDefaultValues);
  } else {
    return destroyCookieFromNookies(null, name, propsWithDefaultValues);
  }
};

const CookieManager = {
  parseAndGet: parseAndGetCookie,
  getAll: getAllCookies,
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
};

export default CookieManager;
