// different sizes youtube exposes
const thumbSizes = [
  ["default", "mqdefault", "hqdefault", "sddefault", "maxresdefault"],
  ["1", "2", "3"],
]
const el = type => document.createElement(type)
const centerflex = `display:flex;justify-content:center;align-items:center`

const videoID = new URL(location).searchParams.get("v")

// create the overlay it to the body
const overlay = el("div")
overlay.setAttribute(
  "style",
  `position:fixed;background:rgba(0,0,0,.75);height:100%;width:100%;z-index:9999;${centerflex};flex-direction:column`
)

for (const row of thumbSizes) {
  const rowEl = el("div")
  rowEl.setAttribute("style", `${centerflex};margin:4px 0;flex-wrap:wrap`)
  for (const thumb of row) {
    const thumbEl = el("img")
    thumbEl.title = `${thumb}`
    thumbEl.setAttribute(
      "style",
      "max-width:35vw;max-height:35vh;margin:4px;box-shadow:0 0 35px 5px #ffffff45;cursor:pointer"
    )
    thumbEl.src = `https://i.ytimg.com/vi/${videoID}/${thumb}.jpg`

    rowEl.appendChild(thumbEl)
  }
  overlay.appendChild(rowEl)
}

document.body.appendChild(overlay)

// click handler for both closing and downloading it
overlay.onclick = e => {
  // detect if image was clicked
  if (e.target.closest("img")) {
    // ideally it would download the image onclick
    // but CORS and browser security disallows it as far as I can tell.
    const { src } = e.target.closest("img")
    window.open(src, "_blank")
  } else overlay.remove()
}
