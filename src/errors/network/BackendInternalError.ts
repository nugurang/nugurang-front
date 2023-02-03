class BackendInternalError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'BackendInternalError';
  }
}

export default BackendInternalError;
