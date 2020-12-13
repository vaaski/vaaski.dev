module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch")

    config.plugin("define").tap(args => {
      const v = JSON.stringify(require("./package.json").version)
      args[0]["process.env"]["VERSION"] = v
      return args
    })
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
