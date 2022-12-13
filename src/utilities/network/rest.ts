import CommonConstants from '@/constants/common';

type RestApiMethod = 'GET' | 'POST';
type RestApiOrigin = string;
type RestApiPathname = string;
interface RestApiProps {
  headers?: {
    [key: string]: string
  },
  data?: object
};

const restFetch = async (
  method: RestApiMethod = 'GET',
  origin: RestApiOrigin = CommonConstants.backendRootUrl,
  pathname: RestApiPathname = '/',
  props: RestApiProps = {}
) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...props.headers
    },
    body: JSON.stringify(props.data),
  };
  const response = await fetch(`${origin}${pathname}`, options);
  return response;
};

const createFetcher = (method: RestApiMethod, origin: RestApiOrigin) => {
  return (async (pathname: RestApiPathname, props: RestApiProps) => await restFetch(
    method,
    origin,
    pathname,
    props
  ));
};

const restGetFromBackend = createFetcher('GET', `${CommonConstants.backendRootUrl}`);
const restPostToBackend = createFetcher('POST', `${CommonConstants.backendRootUrl}`);
const restGetFromFrontend = createFetcher('GET', CommonConstants.frontendRootUrl);
const restPostToFrontend = createFetcher('POST', CommonConstants.frontendRootUrl);

const RestApiManager = {
  getFromBackend: restGetFromBackend,
  postToBackend: restPostToBackend,
  getFromFrontend: restGetFromFrontend,
  postToFrontend: restPostToFrontend
};

export default RestApiManager;
