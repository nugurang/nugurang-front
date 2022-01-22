import {
  destroyCookie as nookieDestroyCookie,
  parseCookies as nookieParseCookies,
  setCookie as nookieSetCookie
} from 'nookies'

import nookies from 'nookies';

export const parseHeaderSetCookie = (rawStringList) => {
  return rawStringList.map(rawString => {
    const list = rawString.replace(' ', '').split(';').map(e => e.split('='));
    let result = {};
    list.forEach(e => {
      result[e[0]] = e[1];
    })
    return result;
  })
};

export const setCookie = (context, key, value, { maxAge, path }) => {
  if (typeof window === "undefined") {
    nookies.set(context, key, value, {
      maxAge,
      path,
    })
  } else {
    nookieSetCookie(null, key, value, {
      maxAge,
      path,
    })
  }
};

export const parseCookies = (context) => {
  if (typeof window === "undefined") {
    return nookies.get(context)
  } else {
    return nookieParseCookies();
  }
};

export const destroyCookie = (context, key, { path }) => {
  if (typeof window === "undefined") {
    nookies.destroy(context, key, {
      path,
    })
  } else {
    nookieDestroyCookie(null, key, {
      path,
    })
  }
};
