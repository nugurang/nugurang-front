import EnvConstants from '@/constants/env';
import ObjectUtilities from '@/utilities/object';

type RestApiMethod = 'GET' | 'POST';
type RestApiOrigin = string;
type RestApiPathname = string;
interface RestApiProps {
  headers?: {
    [key: string]: string
  },
  data?: object
};

const restRequest = async (
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
  const responseJson = ObjectUtilities.isValidJsonString(responseText) ? await JSON.parse(responseText) : {};
  
  return {
    headers: response.headers,
    data: responseJson
  };
};
const restGet = async (
  origin: RestApiOrigin = EnvConstants.backendRootUrl,
  pathname: RestApiPathname = '/',
  props: RestApiProps = {}
) => await restRequest('GET', origin, pathname, props);
const restPost = async (
  origin: RestApiOrigin = EnvConstants.backendRootUrl,
  pathname: RestApiPathname = '/',
  props: RestApiProps = {}
) => await restRequest('POST', origin, pathname, props);

const rest = {
  request: restRequest,
  get: restGet,
  post: restPost,
}

export default rest;
