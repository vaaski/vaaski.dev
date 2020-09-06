module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch")
  },
  productionSourceMap: false,
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js",
      exclude: [/_redirects/],
    },
    themeColor: "#19182d",
    msTileColor: "#19182d",
    name: "vaaski.dev",
  },
}
