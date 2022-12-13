import * as BoardHandlers from './board';
import * as PingHandlers from './ping';
import * as UserHandlers from './user';

const handlers = [
  ...Object.values(BoardHandlers),
  ...Object.values(PingHandlers),
  ...Object.values(UserHandlers),
];

export default handlers;
