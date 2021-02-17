const fs = require('fs');
const path = require('path');

// Name of file that must exist for a renderer to be recognized.
const ENTRY_FILE = 'index.tsx';

/**
 * Describes a renderer.
 */
class RendererInfo {

  /**
   * Constructor.
   *
   * @param {string} name - Renderer name.
   * @param {string} entrypoint - Path to renderer entrypoint.
   */
  constructor(name, entrypoint) {
    this.name = name;
    this.entrypoint = entrypoint;
    this.title = null;
  }
}

/**
 * Returns an array of objects describing the name and entrypoint of a renderer.
 *
 * Each object contains a `name` and `entrypoint` property.
 *
 * Requires Node v10+.
 *
 * @param {string} rendererPath - Absolute path to renderer directory.
 *
 * @returns {Object[]} Array of renderer objects.
 */
const getRenderers = (rendererPath) => {
  const absolutePath = path.resolve(rendererPath);
  return fs.readdirSync(absolutePath, { withFileTypes: true })
    .filter((dirent) => { return dirent.isDirectory(); })
    .filter((dirent) => { return fs.existsSync(path.join(absolutePath, dirent.name, ENTRY_FILE)); })
    .map((dirent) => {
      const name = dirent.name;
      const entrypoint = path.join(absolutePath, dirent.name, ENTRY_FILE);
      return new RendererInfo(name, entrypoint);
    });
};

module.exports = {
  RendererInfo,
  getRenderers,
};
