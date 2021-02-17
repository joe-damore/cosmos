/**
 * Configuration loading error.
 */
export class LoadError extends Error {

  /**
   * @inheritdoc
   */
  constructor(message: string) {
    super(message);
    this.name = 'LoadError';
  }
}
