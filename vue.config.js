module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch")
  },

  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js",
    },
    themeColor: "#19182d",
    msTileColor: "#19182d",
    name: "vaaski.dev",
  },
}
