export const isValidLastUrl = (url: string) => {
  console.log(url);
  return ["auth", "signin", "signup", "oauth", "oAuth"].every(
    (keyString: string) => !url.startsWith(`\/${keyString}`),
  );
};
