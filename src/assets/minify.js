import min from "babel-preset-minify"
import { transform, registerPreset, registerPlugin } from "@babel/standalone"
import syntaxImportMeta from "@babel/plugin-syntax-import-meta"
import presetEnv from "@babel/preset-env"

// todo split into smaller chunks and lazy load them

registerPreset("minify", min)
registerPlugin("@babel/plugin-syntax-import-meta", syntaxImportMeta)
registerPreset("@babel/preset-env", presetEnv)

console.log(min)

export default (_code, { minify, env, iife } = {}) => {
  const presets = []
  let code = _code
  if (minify) presets.push(["minify", { builtIns: false }])
  if (env) presets.push(["@babel/preset-env", { targets: "> 0.25%, not dead" }])
  if (iife)
    if (env) code = `(function() {${code}})()`
    else code = `(() => {${code}})()`

  return transform(code, {
    presets,
    plugins: ["@babel/plugin-syntax-import-meta"],
    comments: false,
  }).code
}
