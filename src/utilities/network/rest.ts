import EnvConstants from '@/constants/env';
import ObjectManager from '../common/object';

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
  origin: RestApiOrigin = EnvConstants.backendRootUrl,
  pathname: RestApiPathname = '/',
  props: RestApiProps = {}
) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(props.headers ?? {})
    },
    body: JSON.stringify(props.data ?? {}),
  };
  const response = await fetch(`${origin}${pathname}`, options);
  const responseText = await response.text();
  const responseJson = ObjectManager.isValidJsonString(responseText) ? await JSON.parse(responseText) : {};
  return {
    headers: response.headers,
    data: responseJson
  };
};
const restGet = async (
  origin: RestApiOrigin = EnvConstants.backendRootUrl,
  pathname: RestApiPathname = '/',
  props: RestApiProps = {}
) => await restFetch('GET', origin, pathname, props);
const restPost = async (
  origin: RestApiOrigin = EnvConstants.backendRootUrl,
  pathname: RestApiPathname = '/',
  props: RestApiProps = {}
) => await restFetch('POST', origin, pathname, props);

const createFetcher = (method: RestApiMethod, origin: RestApiOrigin) => {
  return (async (pathname: RestApiPathname, props: RestApiProps = {}) => await restFetch(
    method,
    origin,
    pathname,
    props
  ));
};

const restGetFromBackend = createFetcher('GET', EnvConstants.backendRootUrl);
const restPostToBackend = createFetcher('POST', EnvConstants.backendRootUrl);
const restGetFromFrontend = createFetcher('GET', EnvConstants.frontendRootUrl);
const restPostToFrontend = createFetcher('POST', EnvConstants.frontendRootUrl);

const RestApiManager = {
  get: restGet,
  post: restPost,
  getFromBackend: restGetFromBackend,
  postToBackend: restPostToBackend,
  getFromFrontend: restGetFromFrontend,
  postToFrontend: restPostToFrontend
};

export default RestApiManager;
