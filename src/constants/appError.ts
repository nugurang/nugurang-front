export interface AppError {
  statusCode: number;
  type: string;
  message: string;
}
type AppErrorGroup = {
  [key: string]: AppError
};

const CommonErrors: AppErrorGroup = {
  DefaultError: {
    statusCode: 500,
    type: 'DefaultError',
    message: 'DefaultError'
  }
}

const NetworkErrors: AppErrorGroup = {
  BackendConnectionLostError: {
    statusCode: 502,
    type: 'BackendConnectionLostError',
    message: 'BackendConnectionLostError'
  }
}

const AuthErrors: AppErrorGroup = {
  OAuth2LoginInternalError: {
    statusCode: 500,
    type: 'OAuth2LoginInternalError',
    message: 'OAuth2LoginInternalError'
  },
  OAuth2UserNotExistError: {
    statusCode: 401,
    type: 'UserNotExistError',
    message: 'UserNotExistError'
  },
  BackendLoginInternalError: {
    statusCode: 500,
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
  common: CommonErrors,
  network: NetworkErrors,
  auth: AuthErrors
};

export default AppErrors;
