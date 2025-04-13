import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { BadgePlus } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default function DonutChartExample(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [showChart, setShowChart] = useState(true)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  useEffect(() => {
    const updateSize = (): void => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.parentElement?.getBoundingClientRect() || {
          width: 0,
          height: 0
        }
        setContainerSize({ width, height })
        // Hide chart if container is too small (increased threshold to 400px)
        setShowChart(width > 250)
      }
    }

    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)
    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement)
    }

    return (): void => resizeObserver.disconnect()
  }, [])

  // Calculate responsive sizes based on container dimensions
  // Increased size calculation to make chart bigger initially
  const chartSize = Math.min(containerSize.width * 0.9, containerSize.height * 0.9)
  const buttonSize = Math.max(chartSize * 0.3, 50) // Larger button size
  const iconSize = Math.max(buttonSize * 0.7, 30) // Larger icon size

  const options = {
    cutout: '40%',
    radius: '100%',
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'point' as const,
      intersect: true
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: '#fff' as const,
        textAlign: 'center' as const,
        font: {
          size: 18,
          weight: 600
        },
        formatter: (value, context): string => {
          const label = context.chart.data.labels[context.dataIndex]
          return `${Math.round(value)}x ${label}P`
        }
      }
    }
  }

  const data = {
    labels: ['11', '12', '13', '14', '15'],
    datasets: [
      {
        label: 'Dataset',
        data: [2, 4, 3, 1, 3],
        backgroundColor: ['#325470', '#7CC2E6', '#5FA0C2', '#416D8B', '#7CC2E6'],
        hoverBackgroundColor: [
          'red', // For the first slice
          '#325470', // For the second slice
          '#325470', // For the third slice,
          '#325470', // For the fourth slice
          '#325470' // For the fifth slice
        ],
        borderColor: ['#15243B'],
        borderWidth: 10
      }
    ]
  }

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      {showChart && (
        <div className="relative" style={{ width: `${chartSize}px`, height: `${chartSize}px` }}>
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              className={`text-white bg-[#353C52] rounded-full hover:bg-[#4a5774] flex items-center justify-center pointer-events-auto transition-all duration-300 ${isButtonHovered ? 'shadow-lg shadow-blue-900/30 scale-110' : ''}`}
              style={{
                width: `${buttonSize}px`,
                height: `${buttonSize}px`
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <BadgePlus
                style={{
                  width: `${iconSize}px`,
                  height: `${iconSize}px`
                }}
                className={`transition-all duration-300 ${isButtonHovered ? 'text-yellow-300 rotate-12' : ''}`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
