/**
 * Configuration serialization error.
 */
class SerializationError extends Error {

  /**
   * @inheritdoc
   */
  constructor(message: string) {
    super(message);
    this.name = 'SerializationError';
  }
}

export default SerializationError;
