console.log("minify.js loaded")

export default async function minify(...args) {
  return (
    await import(
      /* webpackChunkName: "minifyChunk" */
      "./minifyChunk"
    )
  ).default(...args)
}
