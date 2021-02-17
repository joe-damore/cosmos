/**
 * Configuration validation error.
 */
export class ValidationError extends Error {

  /**
   * @inheritdoc
   */
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
