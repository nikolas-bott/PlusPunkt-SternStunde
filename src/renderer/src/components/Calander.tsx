import { getDate } from '@renderer/assets/helperMethod'
import CalanderComponent from './CalanderCoponent'

export default function Calander(): JSX.Element {
  return (
    <div className="h-[calc(100vh-50px)] w-full flex flex-col overflow-y-auto md:overflow-visible">
      <div className={`p-4 md:p-6 lg:p-8 flex items-center justify-between`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Home</h1>
        <div className="bg-primary-dark px-4 py-2 rounded-full">
          <span>{getDate()}</span>
        </div>
      </div>
      <div>
        <CalanderComponent></CalanderComponent>
      </div>
    </div>
  )
}
