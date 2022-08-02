import nookies, {
  destroyCookie as destroyCookieFromNookies,
  parseCookies as parseCookiesFromNookies,
  setCookie as setCookieFromNookies,
} from "nookies";

export function setCookie(context, name, value, params = undefined) {
  const paramsWithDefaultValues = {
    ...params,
    maxAge: params?.maxAge || Number(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE),
    path: params?.path || process.env.NEXT_PUBLIC_COOKIE_PATH,
  };
  if (typeof window === "undefined")
    return nookies.set(context, name, value, paramsWithDefaultValues);
  return setCookieFromNookies(null, name, value, paramsWithDefaultValues);
}

export function getCookies(context) {
  if (typeof window === "undefined") return nookies.get(context);
  return parseCookiesFromNookies();
}

export function destroyCookie(context, name, params = undefined) {
  const paramsWithDefaultValues = {
    ...params,
    path: params?.path || process.env.NEXT_PUBLIC_COOKIE_PATH,
  };
  if (typeof window === "undefined")
    return nookies.destroy(context, name, paramsWithDefaultValues);
  return destroyCookieFromNookies(null, name, paramsWithDefaultValues);
}
