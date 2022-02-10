class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class LoginRequiredError extends AuthenticationError {
  constructor() {
    super('Login Required');
    this.name = "LoginRequiredError";
  }
}

export class LoginFailedError extends AuthenticationError {
  constructor() {
    super('Login Failed');
    this.name = "LoginFailedError";
  }
}

export class LogoutFailedError extends AuthenticationError {
  constructor() {
    super('Logout Failed');
    this.name = "LogoutFailedError";
  }
}

class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class AccessDeniedError extends AuthorizationError {
  constructor() {
    super('Access Denied');
    this.name = "AccessDeniedError";
  }
}
