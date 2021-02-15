import commander from 'commander';

import Config from '@core/lib/system/config/config';
import FileLoader from '@core/lib/system/config/loaders/file-loader';
import JsonSerializer from '@core/lib/system/config/serializers/json-serializer';

/**
 * Root application class.
 *
 * Manages app bootstrapping by parsing CLI arguments and reading configuration
 * data.
 */
abstract class App {

  /**
   * Application name.
   */
  public name: string;

  /**
   * Application version.
   */
  public version: string;

  /**
   * Config JSON schema.
   */
  protected schema: object;

  /**
   * Commander Command instance.
   */
  protected cli: commander.Command;

  /**
   * Loaded configuration data.
   */
  protected config: object | null;

  /**
   * Constructor.
   *
   * Initializes Commander CLI options.
   */
  public constructor(name: string, version: string, schema: object) {
    this.name = name;
    this.version = version;
    this.schema = schema;
    this.cli = new commander.Command();
    this.cli.version(version);
    this.cli.option('-c, --config <filepath>', 'path to config file', './config.json');
    this.config = null;
  }

  /**
   * Gets app CLI commands, arguments, and options.
   *
   * Returns a Command instance which optionally may derive from the default
   * instance for this app.
   *
   * @return {commander.Command} CLI Command instance.
   */
  protected getCliOptions() : commander.Command {
    return this.cli;
  };

  /**
   * Initializes the application.
   *
   * CLI and configuration data are available during application initialization.
   *
   * @returns {number} Exit code.
   */
  protected abstract init() : number;

  /**
   * Exits the application with the given exit code.
   *
   * Optionally outputs a message to describe why the application is exiting.
   *
   * @param {number} code - Exit code.
   * @param {string|undefined} message - Exit message.
   */
  public exit(code: number, message: string|undefined = undefined) {
    const out = (code === 0 ? console.info : console.error);
    if (code > 0 || message) {
      out(message);
    }
    out(`Quitting ${this.name} with exit code ${code}.`);
    process.exit(code);
  }

  /**
   * Starts the application.
   *
   * The application exits after this function completes execution.
   */
  public start() {
    this.cli = this.getCliOptions();
    this.cli.parse();

    // Create configuration manager object.
    const config = new Config(
      new FileLoader(this.cli.opts().config),
      new JsonSerializer(),
      this.schema
    );

    // Attempt to load configuration.
    try {
      this.config = config.loadSync();
    }
    catch (err) {
      switch (err.name) {
        case 'ValidationError':
          this.exit(1, err.message);
          break;

        default:
          this.exit(1, 'Failed to load configuration file.');
          break;
      }
    }

    // Initialize application.
    this.exit(this.init());
  }
}

export default App;
