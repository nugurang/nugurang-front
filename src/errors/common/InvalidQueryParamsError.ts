class InvalidQueryParamsError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidQueryParamsError';
  }
}

export default InvalidQueryParamsError;
