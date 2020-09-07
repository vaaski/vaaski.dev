// strips unnecessary stuff from an amazon product url
// filters out the ASIN and combines it with the location origin

let out = location.href
let url = location.origin
url = url.replace("www.", "")
url = url.replace("https://", "http://")
const asin = /(?:[/dp/]|$)([A-Z0-9]{10})/g
out = asin.exec(out)[1]
out = `${url}/dp/${out}`

prompt("short url:", out)