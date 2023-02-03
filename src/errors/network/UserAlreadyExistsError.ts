class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UserAlreadyExistsError';
  }
}

export default UserAlreadyExistsError;
