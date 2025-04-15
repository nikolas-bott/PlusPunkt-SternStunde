import HomeworkItem from './HomeworkItem'

export function HomeWorkGroup(): JSX.Element {
  return (
    <div className="bg-[#15243B] rounded-3xl p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Biology</h2>
        <h2 className="text-3xl font-bold">2 open</h2>
      </div>
      <div className="flex flex-col gap-5">
        <HomeworkItem></HomeworkItem>
        <HomeworkItem></HomeworkItem>
      </div>
    </div>
  )
}
