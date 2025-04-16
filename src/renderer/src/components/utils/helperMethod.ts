import { MOCK_DATA } from './mockData'

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
