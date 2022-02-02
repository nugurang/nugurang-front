export const getWindowLocation = (context?: any) => {
  return getWindowLocationOrigin(context)
      + getWindowLocationPathname(context);
};

export const getWindowLocationOrigin = (context?: any) => {
  if (typeof window !== 'undefined') {
    if (window.location.origin) return window.location.origin;
    else return window.location.protocol + '//'
        + window.location.hostname 
        + (window.location.port ? ':' + window.location.port : '');
  } else return process.env.NEXT_PUBLIC_FRONTEND_URI;
};

export const getWindowLocationPathname = (context?: any) => {
  if (context) return context.resolvedUrl;
  else if (typeof window !== 'undefined') {
    return window.location.pathname;
  } else return '';
};
