// strips unnecessary stuff from an amazon or ebay product url
// filters out the product id and combines it with the location origin

let out, url

url = location.origin.replace("www.", "")
url = url.replace("https://", "http://")

if (url.startsWith("http://amazon")) {
  const asin = /(?:[/dp/]|$)([A-Z0-9]{10})/g
  out = asin.exec(location.href)[1]
  out = `${url}/dp/${out}`
} else if (url.startsWith("http://ebay")) {
  const id = /\d{12}/
  out = id.exec(location.href)[0]
  out = `${url}/itm/${out}`
}

prompt("short url:", out)
