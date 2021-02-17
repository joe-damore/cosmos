import App from '@core/lib/system/app';
import { BrowserWindow } from 'electron';
import { getEntrypoint } from '@core/lib/window/util';

/**
 * Cosmos app class.
 *
 * Responsible for CLI/Config loading and app bootstrapping.
 */
class CosmosApp extends App {

  /**
   * Start application.
   */
  public init() : number {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    });

    win.loadFile(getEntrypoint('app'));

    return 0;
  }

}

export default CosmosApp;
