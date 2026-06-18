export function getLocalDateTimeString(date = new Date()): string {
  const localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localTime.toISOString().slice(0, 19)
}

