class InvalidBackendUrlPathnameError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidBackendUrlPathnameError';
  }
}

export default InvalidBackendUrlPathnameError;
