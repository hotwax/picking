const path = require('path')
require("@hotwax/app-version-info")
module.exports = {
  // WHY THIS CONFIG: Error while using pinia while importing dxp-components - 
  // Can't import the named export 'computed' from non EcmaScript module (only default export is available)
  // WHY ERROR: Using Vue CLI 4.x may cause this error (according to Pinia docs, did their suggested resolution)
  // REFERENCE: https://pinia.vuejs.org/cookbook/migration-v1-v2.html#webpack-4-support
  configureWebpack: {
    resolve: {
      alias: {
        vue: path.resolve('./node_modules/vue')
      }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
  runtimeCompiler: true,
  transpileDependencies: ['@hotwax/dxp-components']
}
