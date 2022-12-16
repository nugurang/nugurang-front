type AppMode = "mock" | "local" | "dev" | "prod" | null;

const appMode: AppMode = process.env.NEXT_PUBLIC_APP_MODE as AppMode ?? null;
const backendRootUrl = process.env.NEXT_PUBLIC_URL_BACKEND_ROOT ?? "";
const frontendRootUrl = process.env.NEXT_PUBLIC_URL_FRONTEND_ROOT ?? "";
const defaultLocaleCode = process.env.NEXT_PUBLIC_DEFAULT_LOCALE_CODE ?? "";
const isLoggingEnabled = process.env.NEXT_PUBLIC_DEVELOPER_ENABLE_LOGGING ?? false;

const isAppModeProd = appMode === "prod";

const EnvConstants = {
  appMode,
  backendRootUrl,
  frontendRootUrl,
  defaultLocaleCode,
  isLoggingEnabled,

  isAppModeProd,
};

export default EnvConstants;
