import * as fs from 'fs';
import { Loader, LoadError } from '@lib/system/config/loaders';

// TODO Replace fs filesystem reading with cosmos-lib/system/io/filesystem.

/**
 * Load configuration data from a file.
 */
export class FileLoader implements Loader {

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

  /**
   * Asynchronously load config data from filepath.
   *
   * @throws {LoadError} Config file must exist and be readable.
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

  /**
   * Synchronously load config data from filepath.
   *
   * @throws {LoadError} Config file must exist and be readable.
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
