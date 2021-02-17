/**
 * Configuration serialization error.
 */
export class SerializationError extends Error {

  /**
   * @inheritdoc
   */
  constructor(message: string) {
    super(message);
    this.name = 'SerializationError';
  }
}
