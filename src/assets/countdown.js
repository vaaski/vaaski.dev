const calcDuration = ms => {
  let past = false
  if (ms < 0) {
    ms = -ms
    past = true
  }
  const ret = {
    year: Math.floor(ms / 290304e5),
    month: Math.floor(ms / 24192e5) % 12,
    week: Math.floor(ms / 6048e5) % 4,
    day: Math.floor(ms / 864e5) % 7,
    hour: Math.floor(ms / 36e5) % 24,
    minute: Math.floor(ms / 60e3) % 60,
    second: Math.floor(ms / 1e3) % 60,
    past,
  }
  return ret
}

const shortTimes = {
  year: "Y",
  month: "M",
  week: "w",
  day: "d",
  hour: "h",
  minute: "m",
  second: "s",
  millisecond: "ms",
}

const formatDuration = (time, short, joiner = ", ") => {
  if (time.year === 0) delete time.year
  if (!time.year && time.month === 0) delete time.month
  if (!time.month && time.week === 0) delete time.week
  if (!time.week && time.day === 0) delete time.day
  if (!time.day && time.hour === 0) delete time.hour
  if (!time.hour && time.minute === 0) delete time.minute

  const ret = Object.entries(time)
    .filter(val => typeof val[1] !== "boolean")
    .map(([key, val]) =>
      short ? `${val}${shortTimes[key]}` : `${val} ${key}${val !== 1 ? "s" : ""}`
    )
    .join(joiner)
  return ret
}

const timeDown = (time, threshold = 100) => {
  if (time.week || time.month || time.year) return time
  if (time.hour + time.day * 24 < threshold) {
    time.hour = time.hour + time.day * 24
    time.day = 0
  }
  return time
}

module.exports = { calcDuration, timeDown, formatDuration }
