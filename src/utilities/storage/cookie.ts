import nookies, {
  destroyCookie as destroyCookieFromNookies,
  parseCookies as parseCookiesFromNookies,
  setCookie as setCookieFromNookies,
} from 'nookies';
import CookieConstants from '@/constants/cookie';
import IsomorphismManager from '@/utilities/common/isomorphism';
import { GetServerSidePropsContextAdapter } from '@/constants/common';

interface SetCookieProps {
  maxAge?: number,
  path?: string
};
interface DeleteCookieProps {
  maxAge?: number,
  path?: string
};

const parseAndGetCookie = (
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

interface GetAllCookiesProps extends GetServerSidePropsContextAdapter {}
const getAllCookies = (props: GetAllCookiesProps = {}) => {
  if (IsomorphismManager.isServer) {
    return nookies.get(props.context);
  } else {
    return parseCookiesFromNookies();
  }
};

interface GetCookieProps extends GetServerSidePropsContextAdapter {}
const getCookie = (name: string, props: GetCookieProps = {}) => {
  return getAllCookies(props)[name] ?? null;
};

interface SetCookieProps extends GetServerSidePropsContextAdapter {}
const setCookie = (name: string, value: string, props: SetCookieProps = {}) => {
  const propsWithDefaultValues = {
    ...props,
    maxAge: props?.maxAge || CookieConstants.defaultMaxAge,
    path: props?.path || CookieConstants.defaultPath,
  };
  if (IsomorphismManager.isServer) {
    return nookies.set(props.context, name, value, propsWithDefaultValues);
  } else {
    return setCookieFromNookies(null, name, value, propsWithDefaultValues);
  }
};

interface DeleteCookieProps extends GetServerSidePropsContextAdapter {}
const deleteCookie = (name: string, props: DeleteCookieProps = {}) => {
  const propsWithDefaultValues = {
    ...props,
    path: props?.path || CookieConstants.defaultPath,
  };
  if (IsomorphismManager.isServer) {
    return nookies.destroy(props.context, name, propsWithDefaultValues);
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
