export interface AppError {
  statusCode: number;
  type: string;
  message: string;
}
type AppErrorGroup = {
  [key: string]: AppError
};

const commonErrors: AppErrorGroup = {
  DefaultError: {
    statusCode: 500,
    type: 'DefaultError',
    message: 'DefaultError'
  }
}

const AuthErrors: AppErrorGroup = {
  OAuth2LoginInternalError: {
    statusCode: 401,
    type: 'OAuth2LoginInternalError',
    message: 'OAuth2LoginInternalError'
  },
  OAuth2UserNotExistError: {
    statusCode: 401,
    type: 'UserNotExistError',
    message: 'UserNotExistError'
  },
  BackendLoginInternalError: {
    statusCode: 401,
    type: 'BackendLoginInternalError',
    message: 'BackendLoginInternalError'
  },
  UserNotExistError: {
    statusCode: 401,
    type: 'UserNotExistError',
    message: 'UserNotExistError'
  }
}

const AppErrors = {
  common: commonErrors,
  auth: AuthErrors
};

export default AppErrors;
