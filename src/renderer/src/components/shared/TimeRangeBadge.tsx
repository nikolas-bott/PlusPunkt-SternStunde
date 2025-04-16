interface TimeRangeBadgeProps {
  startDate: string
  state: 'neg' | 'pos' | 'neutral'
}

export default function TimeRangeBadge({ startDate, state }: TimeRangeBadgeProps): JSX.Element {
  return (
    <span
      className={`${state + '-card'} text-sm font-bold ml-2 py-1 px-2 rounded-full whitespace-nowrap overflow-hidden text-ellipsis`}
      style={{
        maxWidth: '100px'
      }}
      title="Last Month"
    >
      {startDate}
    </span>
  )
}
