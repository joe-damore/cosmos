import * as fs from 'fs';
import Loader from '@core/lib/system/config/loader';
import LoadError from '@core/lib/system/config/load-error';

/**
 * Load configuration data from a file.
 */
class FileLoader implements Loader {

  /**
   * Path to config file to load.
   */
  public filepath: string;

  /**
   * Constructor.
   *
   * @param {string} filepath - Path to config file to load.
   */
  constructor(filepath: string) {
    this.filepath = filepath;
  }

  // TODO Document thrown `LoadError` exception via JSDoc.
  /**
   * Asynchronously load config data from filepath.
   *
   * @returns {string} Loaded config data.
   */
  public async load() : Promise<string> {
    try {
      return fs.promises.readFile(this.filepath, 'utf8');
    }
    catch (err) {
      throw new LoadError(`Failed to load configuration file from ${this.filepath}`);
    }
  }

  // TODO Document thrown `LoadError` exception via JSDoc.
  /**
   * Synchronously load config data from filepath.
   *
   * @returns {Promise<string>} Promise that resolves to loaded config data.
   */
  public loadSync() : string {
    try {
      return fs.readFileSync(this.filepath, 'utf8');
    }
    catch (err) {
      throw new LoadError(`Failed to load configuration file from ${this.filepath}`);
    }
  }
}

export default FileLoader;
