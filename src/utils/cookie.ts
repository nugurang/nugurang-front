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
  context?: any;
  key: string;
  value: string;
  props: {
    maxAge: number;
    path: string;
  }
}

export const setCookie = (props: SetCookieProps) => {
  if (typeof window === 'undefined') {
    nookies.set(props.context, props.key, props.value, props.props)
  } else {
    nookieSetCookie(null, props.key, props.value, props.props)
  }
};

interface ParseCookiesProps {
  context?: any;
}

export const parseCookies = (props: ParseCookiesProps) => {
  if (typeof window === 'undefined') {
    return nookies.get(props.context);
  } else {
    return nookieParseCookies();
  }
};

interface DestroyCookieProps {
  context?: any;
  key: string;
  props: {
    path: string;
  }
}

export const destroyCookie = (props: DestroyCookieProps) => {
  if (typeof window === 'undefined') {
    nookies.destroy(props.context, props.key, props.props)
  } else {
    nookieDestroyCookie(null, props.key, props.props)
  }
};
