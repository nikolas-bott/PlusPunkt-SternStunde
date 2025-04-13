import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { BadgePlus } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DonutChartExample(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [showChart, setShowChart] = useState(true)

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

    return () => resizeObserver.disconnect()
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
    plugins: {
      legend: {
        display: false
      },
      datalabels: false
    }
  }

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        label: 'Dataset',
        data: [20, 15, 30, 25, 10],
        backgroundColor: ['#325470', '#7CC2E6', '#5FA0C2', '#416D8B', '#7CC2E6'],
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
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="text-white bg-[#353C52] rounded-full hover:bg-[#3d4663] flex items-center justify-center"
              style={{
                width: `${buttonSize}px`,
                height: `${buttonSize}px`
              }}
            >
              <BadgePlus style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
