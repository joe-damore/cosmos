const path = require('path');

/**
 * Returns a map of compilation path aliases.
 *
 * If build is for a renderer, as indicated by the supplied options, then
 * additional aliases will be included.
 *
 * @param {string} rootPath - Root project path.
 * @param {Object=} options - Options.
 * @param {boolean=} options.renderer - Whether build is for a renderer.
 * @param {string=} options.rendererName - Renderer name.
 *
 * @return {Object} Path aliases.
 */
const getAliases = (rootPath, options = {}) => {
  const rendererOnlyOptions = (() => {
    if (options.renderer && options.rendererName) {
      return {
        '@renderer': path.resolve(rootPath, 'src', 'renderers', options.rendererName),
      };
    }
    return [];
  });

  return {
    '@core': path.resolve(rootPath, 'src', 'core'),
    '@ui': path.resolve(rootPath, 'src', 'core', 'lib', 'react', 'ui'),
    '@themes': path.resolve(rootPath, 'src', 'core', 'themes'),
    '@lib': path.resolve(rootPath, 'src', 'core', 'lib'),
    '@main': path.resolve(rootPath, 'src', 'main'),
    '@app': path.resolve(rootPath, 'src', 'main', 'app'),
    '@renderers': path.resolve(rootPath, 'src', 'renderers'),
    ...rendererOnlyOptions,
  };
};

module.exports = {
  getAliases,
};
