const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)

  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}
const wait = (t: number) => new Promise(r => setTimeout(r, t))

const debounce = (fn: Function, ms = 0) => {
  let tid: number
  return function d(...args: any[]) {
    clearTimeout(tid), (tid = setTimeout(() => fn.apply(this, args), ms))
  }
}

const ls = (key: string, value: any) =>
  value === undefined
    ? JSON.parse(localStorage.getItem(key) || "")
    : localStorage.setItem(key, JSON.stringify(value))

const byteFormat = require("byte-size")
const bytesize = (str: string) => byteFormat(new Blob([str]).size)

module.exports = { copyToClipboard, wait, debounce, ls, bytesize }
