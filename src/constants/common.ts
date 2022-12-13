const backendRootUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL ?? "";
const frontendRootUrl = process.env.NEXT_PUBLIC_FRONTEND_ROOT_URL ?? "";

const CommonConstants = {
  backendRootUrl,
  frontendRootUrl
};

export default CommonConstants;
