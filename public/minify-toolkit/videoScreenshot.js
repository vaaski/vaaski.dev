!(() => {
  const el = type => document.createElement(type)
  // select the video element and get its dimensions
  const video = document.querySelector("video")
  const { videoHeight, videoWidth } = video

  // prepare the canvas
  const canvas = el("canvas")
  canvas.height = videoHeight
  canvas.width = videoWidth
  const context = canvas.getContext("2d")

  // draw the video onto it and grab the dataURL
  context.drawImage(video, 0, 0, videoWidth, videoHeight)
  const dataURL = canvas.toDataURL("image/jpeg")

  // create the overlay and img elements and append them to the body
  const overlay = el("div")
  overlay.setAttribute(
    "style",
    "position:fixed;background:rgba(0,0,0,.75);height:100%;width:100%;z-index:9999"
  )
  const img = el("img")
  img.src = dataURL
  img.setAttribute(
    "style",
    `box-shadow:0 0 35px 5px #ffffff45;cursor:pointer;position:absolute;top:50%;left:50%;max-width:90vw;max-height:90vh;transform:translate(-50%,-50%)`
  )
  overlay.appendChild(img)
  document.body.appendChild(overlay)

  // click handler for both closing and downloading it
  overlay.onclick = e => {
    // detect if image was clicked
    if (e.target.closest("img")) {
      // create a download link element and programmatically click it
      const a = el("a")
      a.download = `snap-${canvas.width}x${canvas.height}-${video.currentTime}s.jpg`
      a.href = dataURL
      document.body.appendChild(a).click()
      a.remove()
    } else overlay.remove()
  }
})()
