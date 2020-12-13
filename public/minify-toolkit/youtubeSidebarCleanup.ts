// removes YouTube's unnecessary sidebar items like
// "Library", "Your Videos" and "Your Movies"

// todo detect when element is created instead of waiting a fixed time
const wait = t => new Promise(r => setTimeout(r, t))
const onload = async () => {
  if (document.readyState !== "complete") return
  await wait(1e3)

  const likedVideosOnTop = true

  const qs = (s, n = document) => n.querySelector(s)
  const title = s => `[title='${s}']`

  const removeTitles = ["Library", "Your videos", "Your movies", "Purchases"]
  const remove = [
    qs("#footer.ytd-guide-renderer"),
    qs(title("Movies & shows")).closest("ytd-guide-section-renderer"),
    qs(title("Originals")),
  ]
  const librarySection = qs("#section-items")

  removeTitles.forEach(s => {
    const el = qs(title(s))
    if (el) el.style.display = "none"
  })
  remove.forEach(el => (el.style.display = "none"))

  qs(title("Show more")).click()

  if (likedVideosOnTop) {
    const likedVideos = qs(title("Liked videos")).closest("ytd-guide-entry-renderer")
    librarySection.append(likedVideos)
  }

  const playlists = qs("#expandable-items", librarySection).querySelectorAll(
    "ytd-guide-entry-renderer"
  )
  console.log(playlists)

  for (let i = 0; i < playlists.length; i++) librarySection.append(playlists[i])
  qs(title("Show fewer")).remove()
}

document.onreadystatechange = onload
