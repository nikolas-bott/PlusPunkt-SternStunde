import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function LineChart(): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart instance if exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    // Generate gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, 'rgba(95, 160, 194, 0.8)')
    gradient.addColorStop(1, 'rgba(95, 160, 194, 0.1)')

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: '',
            data: [7, 11, 5, 8, 13, 9],
            borderColor: '#5FA0C2',
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#5FA0C2',
            pointBorderColor: '#FFFFFF',
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#242f47',
            titleColor: '#FFFFFF',
            bodyColor: '#FFFFFF',
            borderColor: '#5FA0C2',
            borderWidth: 1
          },
          datalabels: {
            display: false // Ensures no data labels are shown on the points themselves
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 15,
            ticks: {
              stepSize: 3,
              color: '#FFFFFF'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#FFFFFF'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    })

    return (): void => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div
      style={{ backgroundColor: '#15243B', borderRadius: '15px', padding: '20px', height: '100%' }}
    >
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
