require("@hotwax/app-version-info")
module.exports = {
  // WHY THIS CONFIG: Error while using pinia while importing dxp-components - 
  // Can't import the named export 'computed' from non EcmaScript module (only default export is available)
  // WHY ERROR: Using Vue CLI 4.x may cause this error (according to Pinia docs, did their suggested resolution)
  // REFERENCE: https://pinia.vuejs.org/cookbook/migration-v1-v2.html#webpack-4-support
  configureWebpack: {
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
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: true,
      compositionOnly: false,
      fullInstall: true,
      enableInSFC: true
    }
  }
}
