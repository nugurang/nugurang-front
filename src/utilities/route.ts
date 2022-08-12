import { getCookies } from "@/utilities/common/cookie";

export function getLastUrlBeforeAuthPage(context) {
  return getCookies(context).lastUrlBeforeAuthPage || "/";
}
