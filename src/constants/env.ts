type HttpProtocol = 'http' | 'https';
interface CreateUrlStringProps {
  protocol: HttpProtocol;
  hostname: string;
  port?: number;
};
const createUrlString = ({
  protocol,
  hostname,
  port
}: CreateUrlStringProps) => [
  protocol,
  '://',
  hostname,
  port ? ':' : '',
  port ? String(port) : '',
].join('');

type AppMode = 'mock' | 'local' | 'dev' | 'prod' | null;

const appMode: AppMode = process.env.NEXT_PUBLIC_APP_MODE as AppMode ?? null;
const backendRootUrl = createUrlString({
  protocol: (process.env.NEXT_PUBLIC_URI_BACKEND_PROTOCOL ?? '') as HttpProtocol,
  hostname: process.env.NEXT_PUBLIC_URI_BACKEND_HOSTNAME ?? '',
  port: Number(process.env.NEXT_PUBLIC_URI_BACKEND_PORT) ?? undefined,
});
const frontendRootUrl = createUrlString({
  protocol: (process.env.NEXT_PUBLIC_URI_FRONTEND_PROTOCOL ?? '') as HttpProtocol,
  hostname: process.env.NEXT_PUBLIC_URI_FRONTEND_HOSTNAME ?? '',
  port: Number(process.env.NEXT_PUBLIC_URI_FRONTEND_PORT) ?? undefined,
});
const defaultLocaleCode = process.env.NEXT_PUBLIC_DEFAULT_LOCALE_CODE ?? '';
const isLoggingEnabled = process.env.NEXT_PUBLIC_DEVELOPER_ENABLE_LOGGING ?? false;

const isAppModeMock = appMode === 'mock';
const isAppModeProd = appMode === 'prod';

const EnvConstants = {
  appMode,
  backendRootUrl,
  frontendRootUrl,
  defaultLocaleCode,
  isLoggingEnabled,

  isAppModeMock,
  isAppModeProd,
};

export default EnvConstants;
