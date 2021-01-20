// ==UserScript==
// @name         youtube cleanup
// @version      4
// @description  cleans up YouTubes ui.
// @author       vaaski
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==
/* eslint-disable no-inline-comments */

const title = s => `[title='${s}']`
const removeByTitle = [
  "Library",
  "Your videos",
  "Your movies",
  "Purchases",
  "Originals",
  "YouTube Music",
]
const removeBySelector = [
  "#guide-wrapper #footer",
  "#sections>ytd-guide-section-renderer:nth-child(2)", // subscription section in sidebar
  "ytd-feed-filter-chip-bar-renderer",
  "#voice-search-button",
  ...removeByTitle.map(t => title(t)),
]

// "[is-post] img:not([width])" are the (often animated) pictures in "YouTube posts"
const customCSS = `
${removeBySelector.join()},
[is-post] img:not([width]) {
  display: none;
}
`

/**
 * get an element with querySelector or wait for it using MutationObserver
 * @param {string} selector a css selector
 * @param {HTMLElement} parent the parent in which to search for
 * @returns {Promise<HTMLElement>}
 */
const getElement = (selector, parent = document.querySelector("ytd-app")) => {
  return new Promise(res => {
    let query = parent.querySelector(selector)
    if (query) return res(query)

    let timeout = 0
    const observer = new MutationObserver((list, obs) => {
      for (const mutation of list) {
        if (mutation.type === "childList") {
          query = parent.querySelector(selector)
          if (query) {
            obs.disconnect()
            clearTimeout(timeout)
            return res(query)
          }
        }
      }
    })
    observer.observe(parent, { childList: true, subtree: true })

    timeout = setTimeout(() => {
      observer.disconnect()
      console.log(`observer for ${selector} timed out`)
      return res(document.createElement("div"))
    }, 5e3)
  })
}

!(async () => {
  const customStyles = document.createElement("style")
  customStyles.innerHTML = customCSS
  document.body.appendChild(customStyles)

  removeBySelector.forEach(async t => {
    const el = await getElement(t)
    el.remove()
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
