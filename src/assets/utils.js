const copyToClipboard = str => {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
const wait = t => new Promise(r => setTimeout(r, t))

const debounce = (fn, ms = 0) => {
  let tid
  return function d(...args) {
    clearTimeout(tid), (tid = setTimeout(() => fn.apply(this, args), ms))
  }
}

const ls = (key, value) =>
  value === undefined
    ? JSON.parse(localStorage.getItem(key))
    : localStorage.setItem(key, JSON.stringify(value))

const ByteSize = require("byte-size")
const bytesize = str => ByteSize(new Blob([str]).size)

module.exports = { copyToClipboard, wait, debounce, ls, bytesize }
