import EnvConstants from "@/constants/env";
import Rest from "@/libraries/rest";

type RestApiMethod = 'GET' | 'POST';
type RestApiOrigin = string;
type RestApiPathname = string;
interface RestApiProps {
  headers?: {
    [key: string]: string
  },
  data?: object
};

const createFetcher = (method: RestApiMethod, origin: RestApiOrigin) => {
  return (async (pathname: RestApiPathname, props: RestApiProps = {}) => await Rest.request(
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
  get: Rest.get,
  post: Rest.get,
  getFromBackend: restGetFromBackend,
  postToBackend: restPostToBackend,
  getFromFrontend: restGetFromFrontend,
  postToFrontend: restPostToFrontend
};

export default RestApiManager;
