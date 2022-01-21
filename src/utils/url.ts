export const getWindowLocation = () => {
  if (typeof window !== "undefined") {
    return getWindowLocationOrigin()
        + window.location.pathname
        + window.location.search
        + window.location.hash;
  }
}

export const getWindowLocationOrigin = () => {
  if (typeof window !== "undefined") {
    if (window.location.origin) return window.location.origin;
    else return window.location.protocol + "//" 
        + window.location.hostname 
        + (window.location.port ? ':' + window.location.port : '');
  }
}
