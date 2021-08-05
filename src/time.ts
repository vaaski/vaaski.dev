export interface RenderSettings {
  y: boolean
  M: boolean
  w: boolean
  d: boolean
  h: boolean
  m: boolean
}

interface TimeDistance {
  year?: number
  month?: number
  week?: number
  day?: number
  hour?: number
  minute?: number
  second: number
  past: boolean
}

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const week = day * 7
const month = week * 4
const year = month * 12

const calcDistance = (ms: number): TimeDistance => {
  let past = false
  if (ms < 0) {
    ms = -ms
    past = true
  }
  return {
    year: Math.floor(ms / year),
    month: Math.floor(ms / month) % 12,
    week: Math.floor(ms / week) % 4,
    day: Math.floor(ms / day) % 7,
    hour: Math.floor(ms / hour) % 24,
    minute: Math.floor(ms / minute) % 60,
    second: Math.floor(ms / second) % 60,
    past,
  }
}

const timestamp = (distance: TimeDistance) => {
  let str = `${distance.second}s`
  if (distance.minute) str = `${distance.minute}m ${str}`
  if (distance.hour) str = `${distance.hour}h ${str}`
  if (distance.day) str = `${distance.day}d ${str}`
  if (distance.week) str = `${distance.week}w ${str}`
  if (distance.month) str = `${distance.month}mo ${str}`
  if (distance.year) str = `${distance.year}y ${str}`

  return str
}

export const renderTime = (ms: number, settings: RenderSettings): string => {
  if (isNaN(ms)) throw Error("invalid time")
  const distance = calcDistance(ms)

  if (!settings.y && distance.month && distance.year) {
    distance.month += distance.year * 12
    delete distance.year
  }
  if (!settings.M && distance.day && distance.month) {
    distance.day += distance.month * 4
    delete distance.month
  }
  if (!settings.w && distance.day && distance.week) {
    distance.day += distance.week * 7
    delete distance.week
  }
  if (!settings.d && distance.hour && distance.day) {
    distance.hour += distance.day * 24
    delete distance.day
  }
  if (!settings.h && distance.minute && distance.hour) {
    distance.minute += distance.hour * 60
    delete distance.hour
  }
  if (!settings.m && distance.minute) {
    distance.second += distance.minute * 60
    delete distance.minute
  }

  let stamp = timestamp(distance)
  if (distance.past) stamp = `${stamp} ago`
  else stamp = `in ${stamp}`
  return stamp
}

export const encodeStamp = (d: Date): string => Math.round(d.getTime() / 1e3).toString(36)
export const decodeStamp = (s: string): Date => new Date(parseInt(s, 36) * 1e3)

export const parseTime = (s: string | number | Date): Date => {
  if (typeof s === "string" && /^\d{4}-\d\d-\d\d$/.exec(s)) s += "T00:00"

  const simple = new Date(s)
  if (!isNaN(simple.getTime())) return simple

  if (typeof s === "string") {
    const relativeReg = /(\d{1,2}):(\d\d):?(\d\d)?/
    const relativeMatch = relativeReg.exec(s)
    const relative = new Date()
    if (relativeMatch) {
      const [, h, m, s] = relativeMatch
      relative.setHours(parseInt(h) || 0, parseInt(m) || 0, parseInt(s) || 0, 0)
      return relative
    }

    const unixStampString = new Date(parseInt(s))
    if (!isNaN(unixStampString.getTime())) return unixStampString
  }

  throw "invalid date"
}
