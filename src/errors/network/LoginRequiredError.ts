class LoginRequiredError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'LoginRequiredError';
  }
}

export default LoginRequiredError;
