/**
 * Configuration validation error.
 */
class ValidationError extends Error {

  /**
   * @inheritdoc
   */
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export default ValidationError;
