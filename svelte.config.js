const preprocess = require('svelte-preprocess')
const path = require('path')

module.exports = {
  preprocess: preprocess({
    scss: {
      includePaths: [path.resolve(__dirname, 'src/scss')],
      prependData: '@import "abstracts";',
    },
  }),
}
