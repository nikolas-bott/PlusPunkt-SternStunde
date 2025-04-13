interface TimeStampProps {
  date: string
}

export default function TimeStamp({ date }: TimeStampProps): JSX.Element {
  return (
    <div className="bg-[#283249] rounded-3xl flex items-center justify-center p-5 text-xl font-bold">
      {' '}
      {date}{' '}
    </div>
  )
}
