import { getCookies } from "@/utilities/cookie";

export function getLastUrlBeforeAuthPage(context) {
  return getCookies(context).lastUrlBeforeAuthPage || "/";
}
