type AppMode = 'mock' | 'local' | 'dev' | 'prod' | null;

const appMode: AppMode = process.env.NEXT_PUBLIC_APP_MODE as AppMode ?? null;
const backendRootUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;
const frontendRootUrl = process.env.NEXT_PUBLIC_FRONTEND_ROOT_URL;
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
