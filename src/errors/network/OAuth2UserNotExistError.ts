class OAuth2UserNotExistError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'OAuth2UserNotExistError';
  }
}

export default OAuth2UserNotExistError;
