import App from '@core/lib/system/app';

/**
 * Cosmos app class.
 *
 * Responsible for CLI/Config loading and app bootstrapping.
 */
class CosmosApp extends App {

  public init() : number {
    console.log('Hello, world!');
    console.log(this.config);
    //console.log(this.config.db.path);

    return 0;
  }

}

export default CosmosApp;
