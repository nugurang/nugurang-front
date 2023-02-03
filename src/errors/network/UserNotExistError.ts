class UserNotExistError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UserNotExistError';
  }
}

export default UserNotExistError;
