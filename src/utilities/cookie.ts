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

const CookieUtilities = {
  parseAndGet: parseAndGetCookie
};

export default CookieUtilities;
