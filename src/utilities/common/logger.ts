import IsomorphismManager from './isomorphism';
import EnvConstants from '@/constants/env';
import { PlainObject } from '@/constants/common';

type LoggingVariant = 'info' | 'warn' | 'error' | 'trace' | 'debug';

const Logger = (() => {
  const print = (type: LoggingVariant, ...messages: (string | PlainObject)[]) => {
    const stringifiedMessages = messages.map(message => {
      if(typeof message === 'string') {
        return message;
      } else {
        return JSON.stringify(message);
      }
    })
    if(EnvConstants.isLoggingEnabled) {
      if(IsomorphismManager.isServer) {
        switch(type) {
          case 'info':
          case 'warn':
          case 'error':
          case 'trace':
          case 'debug':
          default:
            console.log('%c DEBUG:', 'background: green; color: white;', ...stringifiedMessages);
        }
      }
    } else {
      switch(type) {
        case 'info':
          console.info('%c INFO:', 'background: blue; color: white;', ...stringifiedMessages);
          break;
        case 'warn':
          console.warn('%c WARN:', 'background: orange; color: white;', ...stringifiedMessages);
          break;
        case 'error':
          console.error('%c ERROR:', 'background: red; color: white;', ...stringifiedMessages);
          break;
        case 'trace':
          console.trace('%c TRACE:', 'background: grey; color: black;', ...stringifiedMessages);
          break;
        case 'debug':
        default:
          console.log('%c DEBUG:', 'background: green; color: white;', ...stringifiedMessages);
      }
    }
  };
  
  return {
    debug: print.bind(null, 'debug'),
    info: print.bind(null, 'info'),
    warn: print.bind(null, 'warn'),
    error: print.bind(null, 'error'),
    trace: print.bind(null, 'trace'),
  };
})();

export default Logger;
