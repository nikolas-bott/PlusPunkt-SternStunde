interface dateOptions {
  weekday: 'long' | 'short' | 'narrow'
  month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit'
  day: 'numeric' | '2-digit'
}

export function getDate(): string {
  const today = new Date()
  const options: dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
  const formatted = today.toLocaleDateString('en-US', options)
  return formatted
}
