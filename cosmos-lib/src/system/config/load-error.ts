/**
 * Configuration loading error.
 */
class LoadError extends Error {

  /**
   * @inheritdoc
   */
  constructor(message: string) {
    super(message);
    this.name = 'LoadError';
  }
}

export default LoadError;
