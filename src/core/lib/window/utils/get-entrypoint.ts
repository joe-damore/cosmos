import * as path from 'path';

/**
 * Returns an absolute path to the entrypoint for the given renderer.
 *
 * @param {string} rendererName - Name of renderer for which to retrieve entrypoint path.
 *
 * @returns {string} Path to entrypoint for renderer named `rendererName`.
 */
const getEntrypoint = (rendererName: string) => {
  const RENDERER_DIRECTORY = 'renderers';
  const RENDERER_ENTRYPOINT = 'index.js';

  return path.resolve(`./${RENDERER_DIRECTORY}`, rendererName, RENDERER_ENTRYPOINT);
}

export default getEntrypoint;
