/**
 * Interface to load configuration data from arbitrary sources.
 */
interface Loader {
  /**
   * Asynchronously loads config data from an arbitrary source.
   */
  load: () => Promise<string>;

  /**
   * Synchronously loads config data from an arbitrary source.
   */
  loadSync: () => string;
};

export default Loader;
