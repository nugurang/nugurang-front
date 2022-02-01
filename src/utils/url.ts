export const getWindowLocation = () => {
  if (typeof window !== 'undefined') {
    return getWindowLocationOrigin()
        + getWindowLocationPathname()
        + window.location.search
        + window.location.hash;
  } else return '';
};

export const getWindowLocationOrigin = () => {
  if (typeof window !== 'undefined') {
    if (window.location.origin) return window.location.origin;
    else return window.location.protocol + '//'
        + window.location.hostname 
        + (window.location.port ? ':' + window.location.port : '');
  } else return '';
};

export const getWindowLocationPathname = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  } else return '';
};
