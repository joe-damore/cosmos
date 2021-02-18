const fs = require('fs');
const path = require('path');

// Name of file that must exist for a renderer to be recognized.
const ENTRY_FILE = 'index.tsx';

// Name of file that may exist for renderer build metadata.
const META_FILE = 'meta.json';

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
    this.template = null;
  }
}

/**
 * Returns an array of objects describing the name and entrypoint of a renderer.
 *
 * Each object contains a `name`, `entrypoint`, `title`, and `template`
 * properties.
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
      const meta = path.join(absolutePath, dirent.name, META_FILE);
      const renderer = new RendererInfo(name, entrypoint);

      renderer.template = path.join(absolutePath, '_assets', 'templates', 'index.html.ejs');
      renderer.title = name;

      if (fs.existsSync(meta)) {
        try {
          const fileData = fs.readFileSync(meta, 'utf8');
          const data = JSON.parse(fileData);

          // Override template.
          if (data.template) {
            if (path.isAbsolute(data.template)) {
              renderer.template = data.template;
            }
            else {
              renderer.template = path.resolve(absolutePath, name, data.template);
            }
          }

          // Override title.
          if (data.title) {
            renderer.title = data.title;
          }
        }
        catch {
          console.error(`Failed to read or parse renderer metadata at ${meta}`);
        }
      }

      return renderer;
    });
};

module.exports = {
  RendererInfo,
  getRenderers,
};
