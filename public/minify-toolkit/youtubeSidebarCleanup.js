// ==UserScript==
// @name         youtube sidebar cleanup
// @version      0
// @description  removes YouTube's unnecessary sidebar items.
// @author       vaaski
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

// removes YouTube's unnecessary sidebar items like
// "Library", "Your Videos" and "Your Movies"

const title = s => `[title='${s}']`
const removeByTitle = [
  "Library",
  "Your videos",
  "Your movies",
  "Purchases",
  "Originals",
  "YouTube Music",
]
const removeBySelector = ["#guide-wrapper #footer", ...removeByTitle.map(t => title(t))]
console.log(removeBySelector)

/**
 * get an element with querySelector or wait for it using MutationObserver
 * @param {string} selector a css selector
 * @param {HTMLElement} parent the parent in which to search for
 * @returns {Promise<HTMLElement>}
 */
const getElement = (selector, parent = document) => {
  return new Promise(res => {
    let query = parent.querySelector(selector)
    if (query) return res(query)

    new MutationObserver((list, obs) => {
      for (const mutation of list) {
        if (mutation.type === "childList") {
          query = parent.querySelector(selector)
          if (query) {
            obs.disconnect()
            return res(query)
          }
        }
      }
    }).observe(parent, { childList: true, subtree: true })
  })
}

!(async () => {
  removeBySelector.forEach(async t => {
    const el = await getElement(t)
    el.style.display = "none"
  })

  const showMore = await getElement(title("Show more"))
  showMore.click()
  const showFewer = await getElement(title("Show fewer"))
  showFewer.remove()

  const likedVideos = await getElement(title("Liked videos"))
  const library = await getElement("#section-items")
  library.insertBefore(likedVideos, library.childNodes[1])

  const moviesAndShows = await getElement(title("Movies & shows"))
  const moreFromYoutube = moviesAndShows.closest("ytd-guide-section-renderer")
  moreFromYoutube.style.display = "none"
})()
