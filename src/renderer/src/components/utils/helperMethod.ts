import { differenceInCalendarDays, formatDistanceToNow, format } from 'date-fns'
import { tz } from '@date-fns/tz'

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

export function calculateTotalAverageOf(data: Array<any>, property: string = 'average'): number {
  const total: number = data.reduce((acc, subject) => acc + subject[property], 0)
  const count = data.length
  let average = total / count
  average = Number(average.toFixed(2))

  return average
}

export function isToday(date: Date): boolean {
  if (!date || !(date instanceof Date)) return false

  const now = new Date()
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  )
}

export function dateAsText(date: Date): string {
  if (!date || !(date instanceof Date)) return ''

  if (isToday(date)) return 'today'
  if (date.getTime() < Date.now()) return 'due'

  const differenceInDays = differenceInCalendarDays(date, new Date(), {
    in: tz('Europe/Berlin')
  })

  if (differenceInDays === 1) return '1 day'
  if (differenceInDays > 1 && differenceInDays < 61) return `${differenceInDays} days`

  console.log('Other format')
  return formatDistanceToNow(date, { addSuffix: false })
}

export function formatDate(date: Date): string {
  return format(date, 'dd/MM/yyyy')
}
