import * as OAuth2UserHandlers from './oAuth2User';
import * as PingHandlers from './ping';
import * as UserHandlers from './user';

const handlers = [
  ...Object.values(OAuth2UserHandlers),
  ...Object.values(PingHandlers),
  ...Object.values(UserHandlers),
];

export default handlers;
