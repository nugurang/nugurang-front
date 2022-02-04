import {
  destroyCookie as nookieDestroyCookie,
  parseCookies as nookieParseCookies,
  setCookie as nookieSetCookie
} from 'nookies'

import nookies from 'nookies';

export const parseHeaderSetCookie: any = (rawString: string) => {
  const list = rawString.replace(' ', '').split(';').map(e => e.split('='));
  let result: { [key: string]: string } = {};
  list.forEach(e => {
    result[e[0]] = e[1];
  })
  return result;
};

export const stringifyCookies = (cookies: any) => {
  return Object.entries(cookies).map(e => e.join('=')).join('; ');
}

interface SetCookieProps {
  key: string;
  value: string;
  props: {
    maxAge: number;
    path: string;
  }
}

export const setCookie = (context: any, props: SetCookieProps) => {
  if (context) {
    nookies.set(context, props.key, props.value, props.props)
  } else {
    nookieSetCookie(null, props.key, props.value, props.props)
  }
};

export const parseCookies: any = (context: any) => {
  if (context) {
    return nookies.get(context);
  } else {
    return nookieParseCookies();
  }
};

interface DestroyCookieProps {
  key: string;
  props: {
    path: string;
  }
}

export const destroyCookie = (context: any, props: DestroyCookieProps) => {
  if (context) {
    nookies.destroy(context, props.key, props.props)
  } else {
    nookieDestroyCookie(null, props.key, props.props)
  }
};
