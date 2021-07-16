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

export interface RenderSettings {
  y: boolean
  M: boolean
  w: boolean
  d: boolean
  h: boolean
  m: boolean
}

const calcDuration = (ms: number): TimeDistance => {
  let past = false
  if (ms < 0) {
    ms = -ms
    past = true
  }
  return {
    year: Math.floor(ms / (1e3 * 60 * 60 * 24 * 7 * 4 * 12)),
    month: Math.floor(ms / (1e3 * 60 * 60 * 24 * 7 * 4)) % 12,
    week: Math.floor(ms / (1e3 * 60 * 60 * 24)) % 4,
    day: Math.floor(ms / (1e3 * 60 * 60 * 24)) % 7,
    hour: Math.floor(ms / (1e3 * 60 * 60)) % 24,
    minute: Math.floor(ms / (1e3 * 60)) % 60,
    second: Math.floor(ms / 1e3) % 60,
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
  const distance = calcDuration(ms)

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
